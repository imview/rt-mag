/*
Navicat MySQL Data Transfer

Source Server         : 172.17.22.41_4306
Source Server Version : 50714
Source Host           : 172.17.22.41:4306
Source Database       : rt_um

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-05-23 17:29:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_action
-- ----------------------------
DROP TABLE IF EXISTS `sys_action`;
CREATE TABLE `sys_action` (
  `id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `namespace` varchar(200) NOT NULL,
  `controller_name` varchar(200) NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(50) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(50) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_action
-- ----------------------------
INSERT INTO `sys_action` VALUES ('001debfa-ad2a-47f5-8725-3b11a5a3b53b', '操作管理-操作列表', '操作管理-操作列表', 'operation/operationList', 'com.rt.mag.controller.um', 'OperationController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('0151511f-2332-467e-860c-418e8c8f9a63', '操作管理-新增修改保存', '操作管理-新增修改保存', 'operation/editOperationInfo', 'com.rt.mag.controller.um', 'OperationController', '新增修改保存', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:33:11');
INSERT INTO `sys_action` VALUES ('03600605-135a-4f19-ad55-7f552d60fa32', '后台配置-角色列表', '权限修改页面', 'role/configuration', 'com.rt.mag.controller.um', 'RoleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:34:11');
INSERT INTO `sys_action` VALUES ('06c6d096-02f8-46bc-8eb8-32c20c2162c3', '后台配置-用户列表', '新增、修改用户', 'user/editUserInfo', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:41:03');
INSERT INTO `sys_action` VALUES ('0e65ec25-2e4d-41cc-a4af-b5f28be748c6', '栏目列表-查看菜单列表', '栏目列表-查看菜单列表', 'category/menuList', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('0f486a09-9f52-4902-840e-bb00f364a0e5', '后台配置-用户列表', '列表页面', 'user/userList', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('0fe15c4f-5b54-435c-b946-55c4768e6852', '操作管理-删除操作', '操作管理-删除操作', 'operation/deleteOperation', 'com.rt.mag.controller.um', 'OperationController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('0fea3e73-ea15-4a73-8e77-99a6eb9fb6e4', '模块列表', '模块列表', 'module/moduleList', 'com.rt.mag.controller.um', 'ModuleController', '模块列表页面链接', '0', '1', '管理员', '2018-05-18 11:49:54', null, null, null);
INSERT INTO `sys_action` VALUES ('0ff94f18-764c-41c7-9cde-83dbf7cc927f', '后台配置-角色列表', '角色权限修改', 'role/saveConfiguration', 'com.rt.mag.controller.um', 'RoleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('14c2cbe0-ade7-471a-9d1e-5a6c9002d1f9', '后台配置-用户列表', '查看权限页面', 'user/configurationByUser', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:41:20');
INSERT INTO `sys_action` VALUES ('15d2d62b-ef42-4f55-85ae-4249e3e0dd58', '后台配置-角色列表', '添加请求', 'role/editRoleInfo', 'com.rt.mag.controller.um', 'RoleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('198df29e-d7e0-4bdf-9304-a0c9afacc8c2', '操作管理-操作分页列表', '操作管理-操作分页列表', 'operation/operationListPage', 'com.rt.mag.controller.um', 'OperationController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('1ac07435-a3c1-4c04-b20b-7f93a0406589', '栏目列表-新增保存', '栏目列表-新增保存', 'category/editCategoryInfo', 'com.rt.mag.controller.um', 'CategoryController', '新增、修改的保存', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:25:50');
INSERT INTO `sys_action` VALUES ('1e4aea83-e101-4471-aba6-60c53f791a51', '后台配置-用户列表', '新增、修改页面', 'user/editUser', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:40:50');
INSERT INTO `sys_action` VALUES ('2099fedb-3818-4f4d-9b64-16f404eff406', '后台配置-用户列表', '获取角色下拉框', 'user/getRoles', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('22a373d8-f82c-4d58-9391-e9ccd431f36f', '栏目列表-获取栏目下拉框数据', '栏目列表-获取栏目下拉框数据', 'category/getCategorys', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('33d1d226-0c86-4e16-b5cc-3cd8ca625631', '动作列表-查询', '动作查询', 'action/actionListPage', 'com.rt.mag.controller.um', 'ActionController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 16:15:01');
INSERT INTO `sys_action` VALUES ('3acb43f7-bb84-424d-a560-aa3982264c22', '公共-通过枚举名获取枚举数据', '公共-通过枚举名获取枚举数据', 'common/getEnums', 'com.rt.mag.controller.um', 'EnumController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-23 14:38:27');
INSERT INTO `sys_action` VALUES ('4eab3a58-b5af-49b2-9484-5fe07cefc341', '栏目列表', '栏目列表', 'category/categoryList', 'com.rt.mag.controller.um', 'CategoryController', '', '0', '1', '管理员', '2018-05-18 11:08:06', null, null, null);
INSERT INTO `sys_action` VALUES ('5f8298a9-464a-425b-bcbd-3194c77e49cc', '模块列表-删除模块', '删除模块', 'module/deleteModule', 'com.rt.mag.controller.um', 'ModuleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-04-13 14:10:35');
INSERT INTO `sys_action` VALUES ('609c8e10-66a3-41ef-b67c-7b6bef8f48a2', '模块管理-新增模块', '模块-新增修改', 'module/editModule', 'com.rt.mag.controller.um', 'ModuleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:28:27');
INSERT INTO `sys_action` VALUES ('63238203-11e5-4a07-b4c8-5323f607102e', '栏目列表-栏目下移', '栏目列表-栏目下移', 'category/moveDown', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('63408f3b-b938-4e2a-b53c-c5611b02e0f4', '栏目列表-打开action配置', '栏目列表-打开action配置', 'category/getOperationActionList', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('672ac06d-747a-4d83-ba86-26c76410fcfc', '模块列表-模块保存', '模块保存', 'module/editModuleInfo', 'com.rt.mag.controller.um', 'ModuleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-04-13 14:14:21');
INSERT INTO `sys_action` VALUES ('6a2b0726-c33e-4a42-bda4-79e60a8f87c2', '栏目列表-新增', '栏目列表-新增', 'category/editCategory', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:21:59');
INSERT INTO `sys_action` VALUES ('6a81b31d-272a-4c40-88f5-c5da3773f767', '动作列表-列表', '动作列表-列表', 'action/actionList', 'com.rt.mag.controller.um', 'ActionController', '', '0', '1', '管理员', '2018-05-17 17:28:14', '1', '管理员', '2018-05-18 16:15:08');
INSERT INTO `sys_action` VALUES ('6a85e368-826e-11e7-af76-005056adaf8e', '功能列表-编辑页', '编辑页', 'action/editAction', 'com.rt.mag.controller.um', 'ActionController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-04-13 14:15:24');
INSERT INTO `sys_action` VALUES ('6f4e3132-cbe4-4a60-a730-7ffc8dcfecd9', '后台配置-角色列表', '角色页面', 'role/roleList', 'com.rt.mag.controller.um', 'RoleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('7574d126-3bf0-4fcf-a1f2-2f027937984a', '后台配置-用户列表', '配置角色页面', 'user/modifyUserRole', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:41:41');
INSERT INTO `sys_action` VALUES ('78b7e30d-1b4d-4767-8777-f3ecbdef3d8e', '后台配置-角色列表', '查询页面', 'role/roleListPage', 'com.rt.mag.controller.um', 'RoleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('80360f9b-9d83-4748-8cd5-f290bf420c70', '栏目列表-栏目上移', '栏目列表-栏目上移', 'category/moveUp', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('804afd68-4d8c-4fff-ade8-777e1f87c193', '模块列表-模块查询', '模块分页', 'module/moduleListPage', 'com.rt.mag.controller.um', 'ModuleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 15:27:10');
INSERT INTO `sys_action` VALUES ('80831476-14eb-40dd-9c70-5376ba3f804f', '栏目列表-栏目查询', '栏目管理-栏目查询', 'category/categoryListPage', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('81e76b4a-2fab-4e95-beb4-5acf65e002ac', '后台配置-用户列表', '启用禁用', 'user/modifyIsEnable', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('87cae44a-c513-4f2a-a7cf-5dffdee851e4', '操作管理-新增操作', '操作管理-新增操作', 'operation/editOperation', 'com.rt.mag.controller.um', 'OperationController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('88540923-801b-4ca7-ba81-944b1fda711e', '后台配置-角色列表', '编辑页面', 'role/editRole', 'com.rt.mag.controller.um', 'RoleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('88984365-0e88-4438-b340-ba639c458d1d', '操作管理-获取栏目菜单下拉数据', '操作管理-获取栏目菜单下拉数据', 'operation/getChildren', 'com.rt.mag.controller.um', 'OperationController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('9054821a-1ab3-4b70-880a-1edcabbcfbc8', '栏目列表-保存action配置', '栏目列表-保存action配置', 'category/addOperationAction', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('96f694ef-4e29-440e-8fee-aae5397c3097', '后台配置-用户列表', '列表查询页面', 'user/userListPage', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('a19005be-4502-42b2-b376-b0f645a96d2a', '栏目管理-删除栏目', '栏目管理-删除栏目', 'category/deleteCategory', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('a5fa06d3-e685-41bc-a9c3-425616689f20', '后台配置-角色列表', '删除角色', 'role/deleteRole', 'com.rt.mag.controller.um', 'RoleController', '删除角色', '0', 'systeminit', 'systeminit', '2018-05-10 14:23:11', null, null, null);
INSERT INTO `sys_action` VALUES ('a70212a6-a2c5-430e-b7a4-2c02dd9fb0bb', '动作列表-编辑保存', '动作保存', 'action/save', 'com.rt.mag.controller.um', 'ActionController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 16:15:16');
INSERT INTO `sys_action` VALUES ('a72f2d39-5627-40fe-8174-3c5de56e869d', '栏目列表-新增菜单页面', '栏目列表-新增菜单页面', 'category/editMenu', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:11:39');
INSERT INTO `sys_action` VALUES ('ae1c1ead-5976-488f-9346-f2fe31b9d366', '栏目列表-获取Action列表', '栏目列表-获取Action列表', 'category/getAllAction', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('bb4094df-826e-11e7-af76-005056adaf8e', '动作列表-删除动作', '删除动作', 'action/del', 'com.rt.mag.controller.um', 'ActionController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 16:15:26');
INSERT INTO `sys_action` VALUES ('bc364a9f-5e15-461c-9aaf-cec1041c8717', '栏目列表-新增菜单保存', '栏目列表-新增菜单保存', 'category/editMenuInfo', 'com.rt.mag.controller.um', 'CategoryController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:23:26');
INSERT INTO `sys_action` VALUES ('c71a8454-6801-4375-a299-b7aa8953293f', '后台配置-用户列表', '重置密码', 'user/resetPassword', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:42:56');
INSERT INTO `sys_action` VALUES ('d1d8512c-9c5a-4650-b0b2-5f250cf33b08', '后台配置-用户列表', '配置角色保存', 'user/saveUserRole', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', '1', '管理员', '2018-05-18 11:43:39');
INSERT INTO `sys_action` VALUES ('db31aa59-bcb9-42ec-b4bb-b8a9e818e89', '用户列表-删除用户', '删除用户', 'user/deleteUser', 'com.rt.mag.controller.um', 'UserController', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('e97af4a4-7dae-477d-bec1-b396fb514e44', '后台配置-用户列表', '解锁', 'user/resetLock', 'com.rt.mag.controller.um', 'UserController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);
INSERT INTO `sys_action` VALUES ('eb599c5a-b4c7-4671-bfa1-0be2ee834962', '栏目列表-获取模块下拉框数据', '栏目列表-获取模块下拉框数据', 'module/getModule', 'com.rt.mag.controller.um', 'ModuleController', '', '0', 'systeminit', 'systeminit', '2017-11-02 13:58:06', null, null, null);

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `source` varchar(50) NOT NULL COMMENT '1-登录2-退出',
  `summary` varchar(200) NOT NULL,
  `remark` varchar(400) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_operation
-- ----------------------------
DROP TABLE IF EXISTS `sys_operation`;
CREATE TABLE `sys_operation` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(400) DEFAULT NULL,
  `parent_id` varchar(50) DEFAULT NULL,
  `sequence` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1-菜单\r\n            2-操作',
  `enabled` int(11) NOT NULL COMMENT '0-否1-是',
  `level` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `icon` varchar(400) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(50) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(50) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_operation
-- ----------------------------
INSERT INTO `sys_operation` VALUES ('0a092fc2-7755-11e7-bf22-04c2c2845005', '添加栏目', 'column/addcolumn', 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'category_add', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('0a30314d-774f-11e7-bf22-04c2c2845005', '添加用户', 'user/adduser', '65bc0e59-774e-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'user_add', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 17:02:31');
INSERT INTO `sys_operation` VALUES ('0cf305bc-fa4d-4747-9f38-370a9edae32d', '操作列表-Action配置', '', '9c48568f-5ed7-4e68-8071-9136426d101f', '1', '2', '1', '4', 'action_setting', '', null, '0', '1', '管理员', '2018-05-17 10:04:01', null, null, null);
INSERT INTO `sys_operation` VALUES ('0fbbdca5-aae7-48ed-85c9-8fbd9ce42eae', '删除角色', '', '6fee9ef2-7751-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'role_deleteRole', '', null, '0', '1', 'admin', '2018-05-08 11:28:28', '1', 'admin', '2018-05-08 11:28:28');
INSERT INTO `sys_operation` VALUES ('115d6b54-774f-11e7-bf22-04c2c2845005', '修改用户', 'user/modifyuser', '65bc0e59-774e-11e7-bf22-04c2c2845005', '2', '2', '1', '4', 'user_modifyuser', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('184cb96f-774f-11e7-bf22-04c2c2845005', '重置密码', 'user/reset', '65bc0e59-774e-11e7-bf22-04c2c2845005', '3', '2', '1', '4', 'user_reset', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('1d3bc4e5-826c-11e7-af76-005056adaf8e', '动作列表', 'action/actionList', 'b005ef00-7751-11e7-bf22-04c2c2845005', '1', '1', '1', '3', null, '', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-23 14:43:17');
INSERT INTO `sys_operation` VALUES ('1e667e2e-774f-11e7-bf22-04c2c2845005', '配置权限', 'user/roleconfig', '65bc0e59-774e-11e7-bf22-04c2c2845005', '4', '2', '1', '4', 'user_roleconfig', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 16:29:23');
INSERT INTO `sys_operation` VALUES ('23ec5c5f-774f-11e7-bf22-04c2c2845005', '查看权限', 'user/viewauthconfig', '65bc0e59-774e-11e7-bf22-04c2c2845005', '5', '2', '1', '4', 'user_viewauthconfig', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('2656a59c-7755-11e7-bf22-04c2c2845005', '修改栏目', 'column/modifycolumn', 'c4a76341-7752-11e7-bf22-04c2c2845005', '2', '2', '1', '4', 'category_edit', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('29cb9e55-774f-11e7-bf22-04c2c2845005', '解锁', 'user/unlock', '65bc0e59-774e-11e7-bf22-04c2c2845005', '6', '2', '1', '4', 'user_unlock', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('2eaca244-774f-11e7-bf22-04c2c2845005', '禁止/启用', 'user/enable', '65bc0e59-774e-11e7-bf22-04c2c2845005', '7', '2', '1', '4', 'user_enable', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('2f067fd9-7755-11e7-bf22-04c2c2845005', '查看菜单', '', 'c4a76341-7752-11e7-bf22-04c2c2845005', '3', '2', '1', '4', 'menu_view', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('32d879e2-18be-4f50-a11b-00091378458d', '栏目-上移', null, 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'category_moveup', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('34b30ca3-7755-11e7-bf22-04c2c2845005', '新增菜单', '', 'c4a76341-7752-11e7-bf22-04c2c2845005', '4', '2', '1', '4', 'menu_add', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('38afe566-7755-11e7-bf22-04c2c2845005', '修改菜单', '', 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'menu_edit', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('4a2ecbb5-826d-11e7-af76-005056adaf8e', '新增', null, '1d3bc4e5-826c-11e7-af76-005056adaf8e', '1', '2', '1', '4', 'action_addaction', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 16:16:45');
INSERT INTO `sys_operation` VALUES ('59c8cb1d-bc20-46f5-87e9-43a336257a62', '栏目-下移', null, 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'category_movedown', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('5b346924-d8cc-45b6-9791-9d2aa3248e7e', '菜单-上移', null, 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'menu_moveup', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('658bf918-826d-11e7-af76-005056adaf8e', '编辑', null, '1d3bc4e5-826c-11e7-af76-005056adaf8e', '2', '2', '1', '4', 'action_modifyaction', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 16:16:49');
INSERT INTO `sys_operation` VALUES ('65bc0e59-774e-11e7-bf22-04c2c2845005', '用户列表', 'user/userList', '9dada742-7750-11e7-bf22-04c2c2845005', '2', '1', '1', '3', null, '', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('65dfe0f5-df22-49ae-bb7a-1fca6ee06eeb', '删除用户', '', '65bc0e59-774e-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'user_delete', '', null, '0', '1', 'admin', '2018-05-08 11:33:34', '1', '管理员', '2018-05-18 17:02:45');
INSERT INTO `sys_operation` VALUES ('6fee9ef2-7751-11e7-bf22-04c2c2845005', '角色列表', 'role/roleList', '9dada742-7750-11e7-bf22-04c2c2845005', '1', '1', '1', '3', null, '', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('79658f36-f9bc-463c-8e41-4f4871bdd73c', '删除操作', null, '9c48568f-5ed7-4e68-8071-9136426d101f', '1', '2', '1', '4', 'operation_delete', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('7c30c869-7751-11e7-bf22-04c2c2845005', '添加角色', 'role/addrole', '6fee9ef2-7751-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'role_addrole', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', 'admin', '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('81532f59-7751-11e7-bf22-04c2c2845005', '修改角色', 'role/modifyrole', '6fee9ef2-7751-11e7-bf22-04c2c2845005', '2', '2', '1', '4', 'role_modifyrole', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('85d39dda-7751-11e7-bf22-04c2c2845005', '角色_配置权限', 'role/authconfig', '6fee9ef2-7751-11e7-bf22-04c2c2845005', '3', '2', '1', '4', 'role_authconfig', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 16:30:09');
INSERT INTO `sys_operation` VALUES ('980c432d-8324-11e7-af76-005056adaf8e', '删除模块', null, 'e71aa7c7-7751-11e7-bf22-04c2c2845005', '3', '2', '1', '4', 'module_deletemodule', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('9c48568f-5ed7-4e68-8071-9136426d101f', '操作管理', 'operation/operationList', 'b005ef00-7751-11e7-bf22-04c2c2845005', '5', '1', '1', '3', null, 'iocn', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('9dada742-7750-11e7-bf22-04c2c2845005', '后台配置', null, 'dfac4d61-7750-11e7-bf22-04c2c2845005', '3', '1', '1', '2', null, '', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-15 17:42:31');
INSERT INTO `sys_operation` VALUES ('a19d9a8f-7752-11e7-bf22-04c2c2845005', '添加模块', null, 'e71aa7c7-7751-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'module_addmodule', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('a347c0bc-e63a-47f4-92ed-a78783444cdd', '菜单action配置', null, 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'menu_action_setting', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 12:03:36');
INSERT INTO `sys_operation` VALUES ('a63d0e6f-7752-11e7-bf22-04c2c2845005', '修改模块', null, 'e71aa7c7-7751-11e7-bf22-04c2c2845005', '2', '2', '1', '4', 'module_modifymodule', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('b005ef00-7751-11e7-bf22-04c2c2845005', '菜单管理', null, 'dfac4d61-7750-11e7-bf22-04c2c2845005', '1', '1', '1', '2', null, '', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('b695db32-826d-11e7-af76-005056adaf8e', '删除', null, '1d3bc4e5-826c-11e7-af76-005056adaf8e', '3', '2', '1', '4', 'action_deleteaction', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-18 16:16:52');
INSERT INTO `sys_operation` VALUES ('c0034cba-9c5e-471f-bc92-7dd0d6d67107', '修改操作', null, '9c48568f-5ed7-4e68-8071-9136426d101f', '1', '2', '1', '4', 'operation_edit', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('c4a76341-7752-11e7-bf22-04c2c2845005', '栏目列表', 'category/categoryList', 'b005ef00-7751-11e7-bf22-04c2c2845005', '4', '1', '1', '3', null, 'ip.jpg', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', '管理员', '2018-05-16 10:31:40');
INSERT INTO `sys_operation` VALUES ('cef6aeca-e182-4aed-bf47-cc97707a2971', '删除栏目', null, 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'category_delete', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('dd05f973-d998-4706-9ebc-540971e2c1cd', '菜单-下移', null, 'c4a76341-7752-11e7-bf22-04c2c2845005', '1', '2', '1', '4', 'menu_movedown', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('dfac4d61-7750-11e7-bf22-04c2c2845005', '系统管理', null, null, '1', '1', '1', '1', null, null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', '1', 'admin', '2017-11-14 19:38:03');
INSERT INTO `sys_operation` VALUES ('e71aa7c7-7751-11e7-bf22-04c2c2845005', '模块列表', 'module/moduleList', 'b005ef00-7751-11e7-bf22-04c2c2845005', '3', '1', '1', '3', null, '', null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');
INSERT INTO `sys_operation` VALUES ('f5330268-68c5-4c80-bd88-f29323876f2d', '新增操作', null, '9c48568f-5ed7-4e68-8071-9136426d101f', '1', '2', '1', '4', 'operation_add', null, null, '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, '2017-11-14 17:46:25');

-- ----------------------------
-- Table structure for sys_operation_action
-- ----------------------------
DROP TABLE IF EXISTS `sys_operation_action`;
CREATE TABLE `sys_operation_action` (
  `id` varchar(50) NOT NULL,
  `operation_id` varchar(50) NOT NULL,
  `action_id` varchar(50) NOT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(20) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(20) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_operation_action
-- ----------------------------
INSERT INTO `sys_operation_action` VALUES ('03f329d3-be27-4775-9c81-cc659fb7284a', 'c4a76341-7752-11e7-bf22-04c2c2845005', 'eb599c5a-b4c7-4671-bfa1-0be2ee834962', '0', '1', '管理员', '2018-05-18 11:50:37', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('0be69318-5db4-46ad-8781-f4661b79adc6', '34b30ca3-7755-11e7-bf22-04c2c2845005', '9054821a-1ab3-4b70-880a-1edcabbcfbc8', '0', '1', '管理员', '2018-05-18 15:15:50', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('0f846592-e854-4c66-849a-51db6d757c86', '2f067fd9-7755-11e7-bf22-04c2c2845005', '0e65ec25-2e4d-41cc-a4af-b5f28be748c6', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('158a2855-4ed9-4c1e-86e4-949e784231c2', '38afe566-7755-11e7-bf22-04c2c2845005', 'ae1c1ead-5976-488f-9346-f2fe31b9d366', '0', '1', '管理员', '2018-05-18 15:17:39', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('1ac07435-a3c1-4c04-b20b-7f93a0406583', '0a092fc2-7755-11e7-bf22-04c2c2845005', '1ac07435-a3c1-4c04-b20b-7f93a0406589', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('1b232ece-b9e7-4017-bd57-674c7c1c3cb7', 'e71aa7c7-7751-11e7-bf22-04c2c2845005', '804afd68-4d8c-4fff-ade8-777e1f87c193', '0', '1', '管理员', '2018-05-18 11:50:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('1b41f563-2aea-44a2-91f1-b68fe24a810c', '2656a59c-7755-11e7-bf22-04c2c2845005', '1ac07435-a3c1-4c04-b20b-7f93a0406589', '0', '1', '管理员', '2018-05-18 12:06:49', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('25e3a7e0-465f-4932-a47f-d5915a50c0db', '34b30ca3-7755-11e7-bf22-04c2c2845005', 'a72f2d39-5627-40fe-8174-3c5de56e869d', '0', '1', '管理员', '2018-05-18 15:15:50', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('26d96c41-7284-4e77-8d9c-0893928443e1', '38afe566-7755-11e7-bf22-04c2c2845005', '9054821a-1ab3-4b70-880a-1edcabbcfbc8', '0', '1', '管理员', '2018-05-18 15:17:39', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('2c10ecab-2f6d-4c93-a174-0e3a6686e976', '4a2ecbb5-826d-11e7-af76-005056adaf8e', '6a85e368-826e-11e7-af76-005056adaf8e', '0', '1', '管理员', '2018-05-18 16:17:23', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('31b03016-82f8-11e7-af76-005056adaf8e', '658bf918-826d-11e7-af76-005056adaf8e', '6a85e368-826e-11e7-af76-005056adaf8e', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('31b03093-82f8-11e7-af76-005056adaf8e', '658bf918-826d-11e7-af76-005056adaf8e', 'a70212a6-a2c5-430e-b7a4-2c02dd9fb0bb', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('31b03146-82f8-11e7-af76-005056adaf8e', 'b695db32-826d-11e7-af76-005056adaf8e', 'bb4094df-826e-11e7-af76-005056adaf8e', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('33cca60d-e156-47e4-9289-34404116f511', '9c48568f-5ed7-4e68-8071-9136426d101f', '001debfa-ad2a-47f5-8725-3b11a5a3b53b', '0', '1', '管理员', '2018-05-17 13:47:08', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('33f79b1c-fc05-4351-8311-133a893a76ba', '9dada742-7750-11e7-bf22-04c2c2845005', 'bb4094df-826e-11e7-af76-005056adaf8e', '0', '1', '管理员', '2017-11-14 16:26:02', '1', '管理员', '2017-11-14 16:26:02');
INSERT INTO `sys_operation_action` VALUES ('35798372-d21d-42e1-98b2-7d11cba09ba7', '9c48568f-5ed7-4e68-8071-9136426d101f', 'eb599c5a-b4c7-4671-bfa1-0be2ee834962', '0', '1', '管理员', '2018-05-17 13:47:08', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('36d81a03-5ff2-40f0-a404-542a1ad0a117', '81532f59-7751-11e7-bf22-04c2c2845005', '15d2d62b-ef42-4f55-85ae-4249e3e0dd58', '0', '1', '管理员', '2018-05-18 15:40:57', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('3816c442-9a2e-4d4a-bfc5-a9941fcf2d5b', '7c30c869-7751-11e7-bf22-04c2c2845005', '03600605-135a-4f19-ad55-7f552d60fa32', '0', '1', '管理员', '2018-05-18 15:41:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('43a8a7b8-d9cd-4f07-aa24-e5aa43ea6432', '59c8cb1d-bc20-46f5-87e9-43a336257a62', '63238203-11e5-4a07-b4c8-5323f607102e', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('48c2d753-2c48-47b9-b8f8-2953bdaae43e', '79658f36-f9bc-463c-8e41-4f4871bdd73c', '0fe15c4f-5b54-435c-b946-55c4768e6852', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('48e3c6b7-5bef-4ab2-891d-13896022e178', '23ec5c5f-774f-11e7-bf22-04c2c2845005', '14c2cbe0-ade7-471a-9d1e-5a6c9002d1f9', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('4e3a4b4f-7fd0-4045-a3ab-ef5c54fe9ab0', 'a347c0bc-e63a-47f4-92ed-a78783444cdd', 'ae1c1ead-5976-488f-9346-f2fe31b9d366', '0', '1', '管理员', '2018-05-18 15:16:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('556d9f69-264f-46cc-bbfe-f63689130ce2', 'cef6aeca-e182-4aed-bf47-cc97707a2971', 'a19005be-4502-42b2-b376-b0f645a96d2a', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('5635f455-1ce7-44de-9c19-106df4a60151', 'c4a76341-7752-11e7-bf22-04c2c2845005', '4eab3a58-b5af-49b2-9484-5fe07cefc341', '0', '1', '管理员', '2018-05-18 11:50:37', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('56d67eae-7047-4495-833e-abae6ec662cb', '2eaca244-774f-11e7-bf22-04c2c2845005', '81e76b4a-2fab-4e95-beb4-5acf65e002ac', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('591591b5-dd13-4734-8702-9c91769e5781', '65bc0e59-774e-11e7-bf22-04c2c2845005', '2099fedb-3818-4f4d-9b64-16f404eff406', '0', '1', '管理员', '2018-05-16 20:14:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('5c0566c2-6e45-48cc-a333-bae7de86e2a4', '34b30ca3-7755-11e7-bf22-04c2c2845005', 'eb599c5a-b4c7-4671-bfa1-0be2ee834962', '0', '1', '管理员', '2018-05-18 15:15:50', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('603e1022-f816-4c7b-9065-842781c51ffe', '38afe566-7755-11e7-bf22-04c2c2845005', 'eb599c5a-b4c7-4671-bfa1-0be2ee834962', '0', '1', '管理员', '2018-05-18 15:17:39', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('616e088b-eb3f-4622-b240-840377099ea3', '0fbbdca5-aae7-48ed-85c9-8fbd9ce42eae', 'a5fa06d3-e685-41bc-a9c3-425616689f20', '0', '1', '管理员', '2018-05-17 10:18:06', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('63fd8452-c235-4d96-b3ab-aa37222a2d09', '29cb9e55-774f-11e7-bf22-04c2c2845005', 'e97af4a4-7dae-477d-bec1-b396fb514e44', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('6547e70d-47ce-4329-b191-bda303833a9a', '0a30314d-774f-11e7-bf22-04c2c2845005', '2099fedb-3818-4f4d-9b64-16f404eff406', '0', '1', '管理员', '2018-05-18 15:28:48', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('65af287c-f060-4ac6-b76b-d10b8cba8f00', '7c30c869-7751-11e7-bf22-04c2c2845005', '15d2d62b-ef42-4f55-85ae-4249e3e0dd58', '0', '1', '管理员', '2018-05-18 15:41:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('677cbd54-1202-4af4-b024-faeef4c11299', '2656a59c-7755-11e7-bf22-04c2c2845005', '6a2b0726-c33e-4a42-bda4-79e60a8f87c2', '0', '1', '管理员', '2018-05-18 12:06:49', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('67b12622-7fa6-4d9e-b109-dfdfd504bcd1', 'a347c0bc-e63a-47f4-92ed-a78783444cdd', '63408f3b-b938-4e2a-b53c-c5611b02e0f4', '0', '1', '管理员', '2018-05-18 15:16:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('7aafd18d-6182-4bd3-a9db-2c449e9550d1', '0cf305bc-fa4d-4747-9f38-370a9edae32d', '63408f3b-b938-4e2a-b53c-c5611b02e0f4', '0', '1', '管理员', '2018-05-17 10:06:06', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('7af5a9c3-49dd-4e0f-9212-ff7790864b8e', '7c30c869-7751-11e7-bf22-04c2c2845005', '0ff94f18-764c-41c7-9cde-83dbf7cc927f', '0', '1', '管理员', '2018-05-18 15:41:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('7fcb2db8-46c1-4478-bd1c-00bb61199088', '38afe566-7755-11e7-bf22-04c2c2845005', '63408f3b-b938-4e2a-b53c-c5611b02e0f4', '0', '1', '管理员', '2018-05-18 15:17:39', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('807cc268-8325-11e7-af76-005056adaf8e', 'a19d9a8f-7752-11e7-bf22-04c2c2845005', '609c8e10-66a3-41ef-b67c-7b6bef8f48a2', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('807cc9c0-8325-11e7-af76-005056adaf8e', 'a19d9a8f-7752-11e7-bf22-04c2c2845005', '672ac06d-747a-4d83-ba86-26c76410fcfc', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('807ccd42-8325-11e7-af76-005056adaf8e', '980c432d-8324-11e7-af76-005056adaf8e', '5f8298a9-464a-425b-bcbd-3194c77e49cc', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('81c746f7-667d-4870-bb0f-4930eec3536e', '0a30314d-774f-11e7-bf22-04c2c2845005', '1e4aea83-e101-4471-aba6-60c53f791a51', '0', '1', '管理员', '2018-05-18 15:28:48', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('86f8b73e-cfa1-420c-8938-b82227752f86', 'e71aa7c7-7751-11e7-bf22-04c2c2845005', '0fea3e73-ea15-4a73-8e77-99a6eb9fb6e4', '0', '1', '管理员', '2018-05-18 11:50:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('87d03b68-1328-41f1-826c-c2f7ec97862a', '0cf305bc-fa4d-4747-9f38-370a9edae32d', '9054821a-1ab3-4b70-880a-1edcabbcfbc8', '0', '1', '管理员', '2018-05-17 10:06:06', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('889675fa-a086-4190-b27d-84b43e1082c8', '65dfe0f5-df22-49ae-bb7a-1fca6ee06eeb', 'db31aa59-bcb9-42ec-b4bb-b8a9e818e89', '0', '1', '管理员', '2018-05-17 10:33:12', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('8a67c02e-0a93-4e1a-a8ab-fd08181525ba', '9c48568f-5ed7-4e68-8071-9136426d101f', '198df29e-d7e0-4bdf-9304-a0c9afacc8c2', '0', '1', '管理员', '2018-05-17 13:47:08', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('8cede279-d273-480c-bf67-30a4826323ac', '5b346924-d8cc-45b6-9791-9d2aa3248e7e', '80360f9b-9d83-4748-8cd5-f290bf420c70', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('91739a35-fc08-4710-b0e2-99efe6d9454a', 'f5330268-68c5-4c80-bd88-f29323876f2d', 'eb599c5a-b4c7-4671-bfa1-0be2ee834962', '0', '1', '管理员', '2018-05-18 12:00:09', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('94d01c30-0828-47d8-9a34-19c1ffd5ca18', '115d6b54-774f-11e7-bf22-04c2c2845005', '06c6d096-02f8-46bc-8eb8-32c20c2162c3', '0', '1', '管理员', '2018-05-18 15:29:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('9d82eff8-2200-4f46-b07a-185740b680b1', '184cb96f-774f-11e7-bf22-04c2c2845005', 'c71a8454-6801-4375-a299-b7aa8953293f', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('9ea860ac-c9bf-4ade-87fd-2b154d646015', '1e667e2e-774f-11e7-bf22-04c2c2845005', 'd1d8512c-9c5a-4650-b0b2-5f250cf33b08', '0', '1', '管理员', '2018-05-18 15:29:51', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('9ee8b55f-5db7-48aa-9bed-ffcd98150e66', '0cf305bc-fa4d-4747-9f38-370a9edae32d', 'ae1c1ead-5976-488f-9346-f2fe31b9d366', '0', '1', '管理员', '2018-05-17 10:06:06', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('a19b110f-d30b-473a-8ede-a86cd40494f6', 'f5330268-68c5-4c80-bd88-f29323876f2d', '0151511f-2332-467e-860c-418e8c8f9a63', '0', '1', '管理员', '2018-05-18 12:00:09', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('a207e150-1cb5-44b4-a664-b440d65249ea', 'f5330268-68c5-4c80-bd88-f29323876f2d', '87cae44a-c513-4f2a-a7cf-5dffdee851e4', '0', '1', '管理员', '2018-05-18 12:00:09', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('a29bdf82-924d-48dc-8346-7981b0fc7300', 'a347c0bc-e63a-47f4-92ed-a78783444cdd', '9054821a-1ab3-4b70-880a-1edcabbcfbc8', '0', '1', '管理员', '2018-05-18 15:16:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('a500376e-2e4d-4710-8c2a-2cebff47fa32', 'c4a76341-7752-11e7-bf22-04c2c2845005', '80831476-14eb-40dd-9c70-5376ba3f804f', '0', '1', '管理员', '2018-05-18 11:50:37', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('a5d6fd5f-b172-4dd7-8db2-d099b0996287', '32d879e2-18be-4f50-a11b-00091378458d', '80360f9b-9d83-4748-8cd5-f290bf420c70', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('a8522d6b-9174-4611-959a-87fb5f63a7d9', '9c48568f-5ed7-4e68-8071-9136426d101f', '88984365-0e88-4438-b340-ba639c458d1d', '0', '1', '管理员', '2018-05-17 13:47:08', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('adbc40af-9561-40e9-a4aa-a229bf896d0d', '6fee9ef2-7751-11e7-bf22-04c2c2845005', '6f4e3132-cbe4-4a60-a730-7ffc8dcfecd9', '0', '1', '管理员', '2018-05-16 20:14:43', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('b8e1a7d2-9b95-440d-9240-d23ffd05cc5f', '1d3bc4e5-826c-11e7-af76-005056adaf8e', '6a81b31d-272a-4c40-88f5-c5da3773f767', '0', '1', '管理员', '2018-05-18 11:48:48', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('bec7c76d-9bf5-4e9f-8bf3-2e226519c2be', '6fee9ef2-7751-11e7-bf22-04c2c2845005', '78b7e30d-1b4d-4767-8777-f3ecbdef3d8e', '0', '1', '管理员', '2018-05-16 20:14:43', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('c4a76341-7752-11e7-bf22-04c2c2845003', '0a092fc2-7755-11e7-bf22-04c2c2845005', '6a2b0726-c33e-4a42-bda4-79e60a8f87c2', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('c55a51ba-408a-4b45-8656-a1067a306d11', '85d39dda-7751-11e7-bf22-04c2c2845005', '03600605-135a-4f19-ad55-7f552d60fa32', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('c88a0bb7-cb29-4a81-98a1-804c38bd199a', '0a30314d-774f-11e7-bf22-04c2c2845005', '06c6d096-02f8-46bc-8eb8-32c20c2162c3', '0', '1', '管理员', '2018-05-18 15:28:48', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('c8b5aa36-fffa-45c4-8d60-e866a3f5c107', '65bc0e59-774e-11e7-bf22-04c2c2845005', '0f486a09-9f52-4902-840e-bb00f364a0e5', '0', '1', '管理员', '2018-05-16 20:14:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('cf474a7c-c6ac-4ac0-97d8-de6e081a9e8d', 'a63d0e6f-7752-11e7-bf22-04c2c2845005', '609c8e10-66a3-41ef-b67c-7b6bef8f48a2', '0', '1', '管理员', '2018-05-18 15:25:17', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('cf51ed5d-5a6f-4442-a678-ea3e1585e21d', '34b30ca3-7755-11e7-bf22-04c2c2845005', '63408f3b-b938-4e2a-b53c-c5611b02e0f4', '0', '1', '管理员', '2018-05-18 15:15:50', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('d23250bf-1177-4999-b0a4-f8546758b554', 'a63d0e6f-7752-11e7-bf22-04c2c2845005', '672ac06d-747a-4d83-ba86-26c76410fcfc', '0', '1', '管理员', '2018-05-18 15:25:17', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('d42f33f8-9e75-4ae2-9591-fbc5d640b421', '1e667e2e-774f-11e7-bf22-04c2c2845005', '7574d126-3bf0-4fcf-a1f2-2f027937984a', '0', '1', '管理员', '2018-05-18 15:29:51', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('d892cabd-8e8c-40a5-98f1-070d7e5f1fa4', '81532f59-7751-11e7-bf22-04c2c2845005', '88540923-801b-4ca7-ba81-944b1fda711e', '0', '1', '管理员', '2018-05-18 15:40:57', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('d9f3f6df-707f-4e04-a5eb-9abee9ba5548', '9dada742-7750-11e7-bf22-04c2c2845005', '5f8298a9-464a-425b-bcbd-3194c77e49cc', '0', '1', '管理员', '2017-11-14 16:26:02', '1', '管理员', '2017-11-14 16:26:02');
INSERT INTO `sys_operation_action` VALUES ('dd678747-4e9d-457e-80a2-128442ed0383', '38afe566-7755-11e7-bf22-04c2c2845005', '22a373d8-f82c-4d58-9391-e9ccd431f36f', '0', '1', '管理员', '2018-05-18 15:17:39', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('dec86909-1118-46de-93e9-db8f46952e22', '7c30c869-7751-11e7-bf22-04c2c2845005', '88540923-801b-4ca7-ba81-944b1fda711e', '0', '1', '管理员', '2018-05-18 15:41:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('df2bb120-f76e-4c17-8f83-d1781154ddfa', 'f5330268-68c5-4c80-bd88-f29323876f2d', '88984365-0e88-4438-b340-ba639c458d1d', '0', '1', '管理员', '2018-05-18 12:00:09', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('e1c8065d-0615-420d-b807-691dc66596c2', '4a2ecbb5-826d-11e7-af76-005056adaf8e', 'a70212a6-a2c5-430e-b7a4-2c02dd9fb0bb', '0', '1', '管理员', '2018-05-18 16:17:23', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('e5a1da50-3d82-49cb-852c-d1b2ae1b88ff', 'c0034cba-9c5e-471f-bc92-7dd0d6d67107', '0151511f-2332-467e-860c-418e8c8f9a63', '0', '1', '管理员', '2018-05-18 11:59:52', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('e6b04b32-241b-4acc-bddb-6ad80a2583d7', 'dd05f973-d998-4706-9ebc-540971e2c1cd', '63238203-11e5-4a07-b4c8-5323f607102e', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('e8b242fe-939a-439f-9194-8450fb14d4cf', '115d6b54-774f-11e7-bf22-04c2c2845005', '2099fedb-3818-4f4d-9b64-16f404eff406', '0', '1', '管理员', '2018-05-18 15:29:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('ea69df8e-9713-4a92-a316-f42c0074ba04', '7c30c869-7751-11e7-bf22-04c2c2845005', '88984365-0e88-4438-b340-ba639c458d1d', '0', '1', '管理员', '2018-05-18 15:41:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('ecdc3f57-ad99-424e-810d-d12839d580ef', '1d3bc4e5-826c-11e7-af76-005056adaf8e', '33d1d226-0c86-4e16-b5cc-3cd8ca625631', '0', '1', '管理员', '2018-05-18 11:48:48', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('ed660724-dfb7-4da8-8004-a381f4fd0f4c', '34b30ca3-7755-11e7-bf22-04c2c2845005', 'ae1c1ead-5976-488f-9346-f2fe31b9d366', '0', '1', '管理员', '2018-05-18 15:15:50', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('ee24348d-5d0e-4251-8016-58e0552c7b27', 'c0034cba-9c5e-471f-bc92-7dd0d6d67107', '88984365-0e88-4438-b340-ba639c458d1d', '0', '1', '管理员', '2018-05-18 11:59:52', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('ee26a4e0-294b-4904-91c4-41f0f79892ea', '34b30ca3-7755-11e7-bf22-04c2c2845005', 'bc364a9f-5e15-461c-9aaf-cec1041c8717', '0', '1', '管理员', '2018-05-18 15:15:50', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('f1ec57a4-c903-46d9-a759-e3d2a2b2e3fc', '115d6b54-774f-11e7-bf22-04c2c2845005', '1e4aea83-e101-4471-aba6-60c53f791a51', '0', '1', '管理员', '2018-05-18 15:29:27', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('f4fe1aca-6835-4a71-bf29-7129ada53085', 'c0034cba-9c5e-471f-bc92-7dd0d6d67107', '87cae44a-c513-4f2a-a7cf-5dffdee851e4', '0', '1', '管理员', '2018-05-18 11:59:52', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('f58cd106-4c0a-431d-bfb6-3827a68666a4', '65bc0e59-774e-11e7-bf22-04c2c2845005', '96f694ef-4e29-440e-8fee-aae5397c3097', '0', '1', '管理员', '2018-05-16 20:14:07', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('f73e3df2-5d66-4a94-aa2a-ab593a02a3c0', '38afe566-7755-11e7-bf22-04c2c2845005', '0e65ec25-2e4d-41cc-a4af-b5f28be748c6', '0', '1', '管理员', '2018-05-18 15:17:39', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('f9f75026-bda1-4429-8837-2f5069098316', '85d39dda-7751-11e7-bf22-04c2c2845005', '0ff94f18-764c-41c7-9cde-83dbf7cc927f', '0', 'systeminit', 'systeminit', '2017-11-02 13:59:18', null, null, null);
INSERT INTO `sys_operation_action` VALUES ('fb38f5d0-54df-416f-9864-c207f201ecfd', 'c0034cba-9c5e-471f-bc92-7dd0d6d67107', 'eb599c5a-b4c7-4671-bfa1-0be2ee834962', '0', '1', '管理员', '2018-05-18 11:59:52', null, null, null);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(50) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(50) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('d6b109b7-b509-4707-9bba-a4546d0832eb', '管理员', '备用的管理员', '0', '1', '管理员', '2018-05-23 16:37:46', null, null, null);

-- ----------------------------
-- Table structure for sys_role_operation
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_operation`;
CREATE TABLE `sys_role_operation` (
  `id` varchar(50) NOT NULL,
  `role_id` varchar(50) NOT NULL,
  `operation_id` varchar(50) NOT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(50) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(50) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_operation
-- ----------------------------
INSERT INTO `sys_role_operation` VALUES ('c99de041-15fd-4c69-9bd6-4348623c4184', 'd6b109b7-b509-4707-9bba-a4546d0832eb', 'dfac4d61-7750-11e7-bf22-04c2c2845005', '0', '1', '管理员', '2018-05-23 16:37:51', '1', '管理员', '2018-05-23 16:37:51');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(50) NOT NULL,
  `login_name` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0-启用 1-禁用',
  `is_super_admin` int(11) NOT NULL COMMENT '0-否1-是',
  `error_count` int(11) DEFAULT NULL,
  `last_error_time` datetime DEFAULT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(50) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(50) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '管理员', 'c7122a1349c22cb3c009da3613d242ab', '13544540132', '', '0', '1', '0', null, '0', 'systeminit', 'systeminit', '2017-11-15 10:51:50', '1', '管理员', null);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `role_id` varchar(50) NOT NULL,
  `is_delete` int(11) NOT NULL,
  `create_user_id` varchar(50) NOT NULL,
  `create_user_name` varchar(50) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_update_user_id` varchar(50) DEFAULT NULL,
  `last_update_user_name` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
