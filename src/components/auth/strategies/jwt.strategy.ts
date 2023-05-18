import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { User } from '@components/users/schema/user.schema';
import jwtConstants from '../constants';

import { IJwtStrategyValidate } from '../interfaces/IJwtStrategyValidate.interface';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: User): Promise<IJwtStrategyValidate> {
    return {
      id: payload._id,
      email: payload.email,
    };
  }
}
