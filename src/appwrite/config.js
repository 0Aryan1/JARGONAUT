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

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
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
