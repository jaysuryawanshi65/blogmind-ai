import mongoose, { Schema } from 'mongoose';
export interface IPost { title:string; excerpt:string; content:string; category:string; tags:string[]; coverImage?:string; author:mongoose.Types.ObjectId; published:boolean; likes:mongoose.Types.ObjectId[]; }
const postSchema = new Schema<IPost>({
 title:{type:String,required:true,minlength:5,maxlength:120,trim:true},
 excerpt:{type:String,required:true,maxlength:280}, content:{type:String,required:true,minlength:30},
 category:{type:String,default:'Technology',trim:true}, tags:{type:[String],default:[]}, coverImage:{type:String,default:''},
 author:{type:Schema.Types.ObjectId,ref:'User',required:true}, published:{type:Boolean,default:false}, likes:[{type:Schema.Types.ObjectId,ref:'User'}]
},{timestamps:true});
postSchema.index({title:'text',excerpt:'text',content:'text',tags:'text'});
export default mongoose.model<IPost>('Post',postSchema);
