import{
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
} from 'class-validator';

export class AddToCartDto {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsInt()
    @IsPositive()
    quantity!: number;
}
