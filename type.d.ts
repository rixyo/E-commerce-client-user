type Billboard ={
    id:string,
    label:string,
    imageUrl:string,
}
type Category ={
    id:string,
    name:string,
    gender:string,
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
}
type Review ={
    id:string,
    rating:number,
}