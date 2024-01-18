export interface User{
  id : number,
  email: string,
  firstName : string,
  lastName: string,
  roles : Role[],
  checked?: boolean
}
export interface Role{
  id : number,
  name: string
}

export interface Book{
  id : number | undefined
  title : string,
  resume: string,
  image: string,
  createdAt: string,
  updatedAt : string,
  pages : Page[],
  categories : Category[],
  users: User[]
}
export interface BookDto{
  title : string,
  resume: string,
  image: string,
  categories: Category[],
  users: User[]
}
export interface Category{
  id: number
  label : string
  checked : boolean
}
export interface Page{
  id: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  book: object
}
export interface updatePageDto{
  title: string,
  content: string,
  book: number
}
