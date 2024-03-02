"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import permissionModel from "../model/permission.schema";
const role_model_1 = __importDefault(require("../model/role.model"));
const CreateIntialData = {
    CreateRole: () => __awaiter(void 0, void 0, void 0, function* () {
        const roles = [
            {
                name: "user",
                title: "User",
                description: "Default author role",
                permissions: [],
            },
            {
                name: "author",
                title: "Auhtor",
                description: "Default author role",
                permissions: [],
            },
            {
                name: "admin",
                title: "Admin",
                description: "Default admin role",
                permissions: [
                    "get_all_roles",
                    "get_role",
                    "create_role",
                    "edit_role",
                    "delete_role",
                    "get_all_permissions",
                    "get_group_permissions",
                    "manage_permission",
                    "get_all_users",
                    "get_user_details",
                    "edit_user_details",
                    "delete_user",
                    "create_user",
                    "update_user_status",
                    "get_all_authors",
                    "get_author_details",
                    "edit_author_details",
                    "delete_author",
                    "create_author",
                    "update_author_status",
                    "get_all_admins",
                    "get_admin",
                    "edit_admin",
                    "create_subadmin",
                    "edit_admin_role",
                    "delete_subadmin",
                    "update_subadmin_status",
                ],
            },
        ];
        const existingRoles = yield role_model_1.default.find();
        if (existingRoles.length === 0) {
            // If no roles exist, create the initial roles in the database
            const createRoles = yield role_model_1.default.create(roles);
        }
    }),
    //   CreatePermission: async () => {
    //     const permissions = [
    //       // role_management
    //       {
    //         name: "get_all_roles",
    //         groupName: "role_management",
    //       },
    //       {
    //         name: "get_role",
    //         groupName: "role_management",
    //       },
    //       {
    //         name: "create_role",
    //         groupName: "role_management",
    //       },
    //       {
    //         name: "edit_role",
    //         groupName: "role_management",
    //       },
    //       {
    //         name: "delete_role",
    //         groupName: "role_management",
    //       },
    //       // permission_management
    //       {
    //         name: "get_all_permissions",
    //         groupName: "permission_management",
    //       },
    //       {
    //         name: "get_group_permissions",
    //         groupName: "permission_management",
    //       },
    //       {
    //         name: "manage_permission",
    //         groupName: "permission_management",
    //       },
    //       // user_management
    //       {
    //         name: "get_all_users",
    //         groupName: "user_management",
    //       },
    //       {
    //         name: "get_user_details",
    //         groupName: "user_management",
    //       },
    //       {
    //         name: "edit_user_details",
    //         groupName: "user_management",
    //       },
    //       {
    //         name: "delete_user",
    //         groupName: "user_management",
    //       },
    //       {
    //         name: "create_user",
    //         groupName: "user_management",
    //       },
    //       {
    //         name: "update_user_status",
    //         groupName: "user_management",
    //       },
    //       // author_management
    //       {
    //         name: "get_all_authors",
    //         groupName: "author_management",
    //       },
    //       {
    //         name: "get_author_details",
    //         groupName: "author_management",
    //       },
    //       {
    //         name: "edit_author_details",
    //         groupName: "author_management",
    //       },
    //       {
    //         name: "delete_author",
    //         groupName: "author_management",
    //       },
    //       {
    //         name: "create_author",
    //         groupName: "author_management",
    //       },
    //       {
    //         name: "update_author_status",
    //         groupName: "author_management",
    //       },
    //       // admin_management
    //       {
    //         name: "get_all_admins",
    //         groupName: "admin_management",
    //       },
    //       {
    //         name: "get_admin",
    //         groupName: "admin_management",
    //       },
    //       {
    //         name: "edit_admin",
    //         groupName: "admin_management",
    //       },
    //       {
    //         name: "create_subadmin",
    //         groupName: "admin_management",
    //       },
    //       {
    //         name: "edit_admin_role",
    //         groupName: "admin_management",
    //       },
    //       {
    //         name: "delete_subadmin",
    //         groupName: "admin_management",
    //       },
    //       {
    //         name: "update_subadmin_status",
    //         groupName: "admin_management",
    //       },
    //     ];
    //     const existingPermission = await permissionModel.find();
    //     if (existingPermission.length === 0) {
    //       // If no permissions exist, create the initial permissions in the database
    //       const createPermissions = await permissionModel.create(permissions);
    //     }
    //   }
};
exports.default = CreateIntialData;
