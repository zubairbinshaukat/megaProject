import config from '../env config/config'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId)
    this.databases = new Databases()
    this.bucket = new Storage()
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      )
    } catch (error) {
      throw error
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    //as we are using slug as id its better if we get it first and then other parameters
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      )
    } catch (error) {
      throw error
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      )
      return true
    } catch (error) {
      throw error
      return false
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      )
    } catch (error) {
      throw error
    }
  }
  async getPosts(queries = [Query.equal('status', 'active')]) {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries,
    )
  }

  //file upload services

  async uploadFie(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        throw error
    }
  }
  async deleteFie(fileId){
    try {
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        throw error
        return false
    }
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,
    )
  }
}

const service = new Service()

export default service
