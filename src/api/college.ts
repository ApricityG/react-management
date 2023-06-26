import request from "@/utils/request";
import { Module} from './user'

export type campusesAllType = {
  id:number,
  name:string,
  address:string
}
export type collegeDataType = {
  id:number,
  collegeName:string,
  campusName:string,
  address:string,
  majorName:string
}
export type collegeAllType = {
  data:collegeDataType[],
  total:number,
  offset:number
}
export type CollegeType = {
  body_temperature:string[],
  collegeName:string,
  address:string,
  campusName:string
}
// 获取所有的校区
export const getCampuses =() => request.get<null,Module<campusesAllType[]>>('/campusAll')
// 获取所有院校
export const getColleges =(offset:number,count:number) => request.get<null,Module<collegeAllType>>(`/collegeAll/${offset}/${count}`)
// 根据校区ID获取院校
export const getCollegeById = (offset:number,count:number,id:number) => request.get<null,Module<CollegeType[]>>(`/collegeById/${offset}/${count}/${id}`)