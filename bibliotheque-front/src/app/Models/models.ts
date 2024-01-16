export interface User{
  id : number,
  email: string,
  firstName : string,
  lastName: string,
  roles : Role[],
}
export interface Role{
  id : number,
  name: string
}

export interface Book{
  title : string,
  resume: string,
  image: string,
  createdAt: string,
  updatedAt : string,
  pages : Page[],
  categories : Category[],
  user: User[]
}
export interface Category{
  id: number,
  label : string
  checked? : boolean
}
export interface Page{
  id: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  book: object
}
