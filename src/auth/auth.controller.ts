import { Controller, Get, Post, Body,  UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto , LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { RawHeaders,GetUser, Auth, RoleProtected  } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }


  @Post('login')

  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto)

  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
  @GetUser() user: User
  ){
    return this.authService.checkAuthStatus(user)
  }


  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRouter(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ){
    
   
    return{
      ok:true,
      message:'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

  @Get('provate2')
 
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateToute2(
    @GetUser() user: User
  ){
    return {
      ok:true,
      user
    }
  }


  @Get('provate3')
 @Auth(ValidRoles.admin)
  privateToute3(
    @GetUser() user: User
  ){
    return {
      ok:true,
      user
    }
  }
}
