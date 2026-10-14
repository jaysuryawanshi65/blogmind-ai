import mongoose, { Schema } from 'mongoose';
export interface IUser { name: string; email: string; password: string; bio?: string; interests: string[]; }
const userSchema = new Schema<IUser>({
 name:{type:String,required:true,minlength:2,maxlength:60,trim:true},
 email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 password:{type:String,required:true}, bio:{type:String,default:'',maxlength:180},
 interests:{type:[String],default:[]}
},{timestamps:true});
export default mongoose.model<IUser>('User',userSchema);
