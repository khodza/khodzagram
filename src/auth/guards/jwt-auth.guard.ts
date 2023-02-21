import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export class JwtAuthGuard extends AuthGuard('jwt') {}
