import mongoose,{Schema} from 'mongoose';
const schema=new Schema({post:{type:Schema.Types.ObjectId,ref:'Post',required:true},author:{type:Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true,minlength:1,maxlength:1000,trim:true}},{timestamps:true});
export default mongoose.model('Comment',schema);
