import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // ดึง Role ที่จำเป็นจาก Decorator
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // ถ้าไม่มีการกำหนด Role ใน Route ให้อนุญาต
    }

    // ดึงข้อมูล user จาก Request (JWT จะเพิ่มข้อมูลนี้)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // ตรวจสอบว่าผู้ใช้มี Role ที่ตรงกับที่กำหนดใน @Roles()
    return requiredRoles.some((role) => user.role === role);
  }
}
