import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interface/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUser: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUser).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    return this.client.send('auth.login.user', loginUser).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
