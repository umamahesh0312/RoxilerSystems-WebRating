import React from 'react';
import { UserRole } from '@/types';
interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    fallbackPath?: string;
}
export declare const RoleGuard: React.FC<RoleGuardProps>;
export default RoleGuard;
