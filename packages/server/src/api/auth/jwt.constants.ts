import {JwtModuleOptions} from '@nestjs/jwt'
export const jwtConstants:JwtModuleOptions = {
  secret: 'HHONfYnlkjs86832-sdknm,sdusdf',
  signOptions: {
    expiresIn: '60s'
  }
};
