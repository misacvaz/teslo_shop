import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsIn, IsInt, IsNumber, 
    IsOptional, IsPositive, IsString, 
    MinLength } from "class-validator"



export class CreateProductDto {

    @ApiProperty({
        description:'Product title (unique)',
        nullable:false,
        minLength:1

    })
    @IsString()
    @MinLength(1)
    title: string
    
    @ApiProperty({
        description:'Product Price',
        nullable:true
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number
    
    @ApiProperty({
        description:'Product Description',
        nullable:true
    })
    @IsString()
    @IsOptional()
    description?: string
    

    @ApiProperty({
        description:'Product Slug',

    })
    @IsString()
    @IsOptional()
    slug?: string
    
    @ApiProperty({
        description:'Product Stock',
        nullable:true
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    @ApiProperty({
        description:'Product Sizes',
        nullable:false
    })
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    sizes: string[]
    
    @ApiProperty({
        description:'Product gender',
        nullable:false
    })
    @IsIn(['men','women', 'kid'])
    gender: string
  
  
    @ApiProperty({
        description:'Product tags',
        nullable:false
    })
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    tags:string[]

    @ApiProperty({
        description:'Product Images',
        nullable:true
    })
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    images?:string[]


}
