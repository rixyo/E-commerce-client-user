type Billboard ={
    id:string,
    label:string,
    imageUrl:string,
}
type Category ={
    id:string,
    name:string,
    gender:string,
    imageUrl:string,
    billboard:Billboard,
}
type Product ={
    id:string,
    name:string,
    price:number,
    description:string,
    category:Category,
    Images:Image[],
    Sizes:ProductSize[],
    Colors:ProductColor[],
    reviews:Review[],
}
type Image ={
    id:string,
    url:string,
}
type ProductSize ={
    id:string,
    value:string,
}
type ProductColor ={
    id:string,
    value:string,
    name:string,
}
type Review ={
    id:string,
    rating:number,
}
type CartProduct ={
    id:string,
    name:string,
    price:number,
    image:string,
    quantity:number,
    size:string,
    color:string,
}
type Order ={
    id:string,
    orderItems:orderItem[],
    createdAt: Date;
}
type orderItem ={
    id:string,
    product: {
        id: string;
        name: string;
        Images:Image[]; 
    }
    quantity:number,
    size:string,
    color:string,
}