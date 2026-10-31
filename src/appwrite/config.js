import conf from '../conf/conf.js';
import {Client, Databases, Storage, Query, ID} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(slug){
        try{
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                [Query.equal("slug", slug)]
            )
            return response.documents[0] || null;
        } catch(error) {
            console.log("Apwrite service :: getPost() ::", error)
            return null;
        }
    }

    async getPosts(
  queries = [
    Query.equal("status", "active"),
    Query.orderDesc("$createdAt")   // Latest first
  ]
) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries
    );
  } catch (error) {
    console.log("Appwrite service :: getPosts() ::", error);
  }
}

    async createPost({title,slug, content, featuredImage, status, userId, Author}){
        try{
            console.log('Creating post with data:', { title, slug, content, featuredImage, status, userId, Author });
            console.log('userId value:', userId);
            console.log('userId type:', typeof userId);
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    Author
                }
            )
        } catch(error){
            console.log("Apwrite service :: createPost() ::", error)
            throw error;
        }
    }

    async updatePost(slug, {title, slug: newSlug, content,featuredImage,status}){
        try{
            // First find the document by slug
            const post = await this.getPost(slug);
            if (!post) {
                throw new Error("Post not found");
            }
            
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                post.$id,
                {
                    title,
                    slug: newSlug || slug,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(error){
            console.log("Apwrite service :: updatePost() ::", error)
            throw error;
        }
    }

    async deletePost(slug){
        try{
            // First find the document by slug
            const post = await this.getPost(slug);
            if (!post) {
                throw new Error("Post not found");
            }
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                post.$id
            )
            return true;
        } catch(error){
            console.log("Apwrite service :: deletePost() ::", error);
            return false;
        }
    }

    // storage service

    // Resize to maxWidth and re-encode as WebP before upload; falls back to the original file
    async compressImage(file, maxWidth = 1200, quality = 0.8){
        if (!file?.type?.startsWith('image/') || file.type === 'image/gif') return file;
        try{
            const bitmap = await createImageBitmap(file);
            const scale = Math.min(1, maxWidth / bitmap.width);
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(bitmap.width * scale);
            canvas.height = Math.round(bitmap.height * scale);
            canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            bitmap.close();

            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
            if (!blob || blob.size >= file.size) return file;

            const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
            return new File([blob], name, { type: 'image/webp' });
        } catch(error){
            console.log("Apwrite service :: compressImage() ::", error);
            return file;
        }
    }

    async uploadFile(file){
        try{
            const compressed = await this.compressImage(file);
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                compressed
            )
        } catch(error){
            console.log("Apwrite service :: uploadFile() ::", error);
            return false;
        }
    }
 
    
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch(error){
            console.log("Apwrite service :: deleteFile() ::", error);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            // Use getFileView instead of getFilePreview to avoid image transformation restrictions
            const url = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
            return url;
        } catch(error){
            console.log("Appwrite service :: getFilePreview() :: error", error);
            return null;
        }
    }  

}

const service = new Service();

export default service;
