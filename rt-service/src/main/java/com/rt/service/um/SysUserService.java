package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysUser;
import com.rt.dao.mapper.um.SysUserMapper;
import com.rt.dao.mapper.um.SysUserRoleMapper;
import com.rt.dto.um.*;
import com.rt.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SysUserService extends ServiceImpl<SysUserMapper,SysUser> {

    @Autowired
    SysUserRoleMapper userRoleMapper;

    /** 根据后台账号（登录名）查找用户
     *
     * @param loginName
     * @return
     */
    public SysUserDTO getUserByLoginName(String loginName) {
        SysUser userPO = baseMapper.getUserByLoginName(loginName);
        SysUserDTO userDTO = BeanMapperUtil.map(userPO, SysUserDTO.class);
        return userDTO;
    }

    /**
     * 用户修改密码
     * @param user
     * @throws Exception
     */
    @Transactional("um")
    public Integer updateUserPwd(SysUserDTO user) throws Exception {
       Integer rows =  baseMapper.updateUserPwd(user);
        return rows;
    }

    public List<SysOperationActionWithLevelDTO> getAllOperationAction() throws Exception {
        List<SysOperationActionWithLevelDTO> list = baseMapper.getAllOperationAction();
        return list;
    }

    public List<SysOperationActionWithLevelDTO> getOperationActionByUserId(String userId) throws Exception {
        List<SysOperationActionWithLevelDTO> list = baseMapper.getOperationActionByUserId(userId);
        return list;
    }

    @Transactional("um")
    public Integer updateUserErrorCount(SysUserDTO user) throws Exception {
        Integer rows =  baseMapper.updateUserErrorCount(user);
        return rows;
    }

    /** 重置密码
     ** resetUserPassword
     * @param userId
     * @param curUserId
     * @param curUserName
     * @return
     * @throws Exception
     */
    @Transactional("um")
    public ServiceResult resetUserPassword(String userId, String curUserId, String curUserName) throws Exception {
        //使用mybatis的SQL的方式
        ServiceResult result = new ServiceResult();
        try {
            SysUserDTO userDTO = baseMapper.getUserByUserId(userId);
            String newPwd = MD5Util.getMD5Encoding(MD5Util.getMD5Encoding("123456") + userDTO.getLoginName());
            userDTO.setPassword(newPwd);
            Date utilDate = new Date();
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
            userDTO.setLastUpdateTime(sqlDate);
            userDTO.setLastUpdateUserId(curUserId);
            userDTO.setLastUpdateUserName(curUserName);
            baseMapper.updateUserPwd(userDTO);
            result.succeed("重置密码成功");
        } catch (Exception e) {
            result.succeed("重置密码失败");
            e.printStackTrace();
            throw e;
        }
        return result;
/*
        //使用mybatis-plus 默认的baseMapper更新方法
        SysUser userPO = userMapper.selectById(userId);
        String newPwd = MD5Util.getMD5Encoding(MD5Util.getMD5Encoding("123456") + userPO.getLoginName());
        userPO.setPassword(newPwd);
        Date utilDate = new Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        userPO.setLastUpdateTime(sqlDate);
        userPO.setLastUpdateUserId(curUserId);
        userPO.setLastUpdateUserName(curUserName);
        Integer resetPwdResult = baseMapper.updateById(userPO);

        if(resetPwdResult >0)
            return true;
        else
            return false;*/
    }

    public SysUserDTO getUserByUserId(String userId) throws Exception {
//        SysUser userPO = userMapper.selectById(userId);
//        SysUserDTO userDTO = BeanMapperUtil.map(userPO, SysUserDTO.class);
        SysUserDTO userDTO = baseMapper.getUserByUserId(userId);
        return userDTO;
    }

    /** 更新用户的角色（给用户配置角色）
     * updateUserRoleByUserId
     * @param userId
     * @param curUserId
     * @param curUserName
     * @param roleIDs
     * @return
     * @throws Exception
     */
    public ServiceResult updateUserRoleByUserId(String userId, String curUserId, String curUserName, String... roleIDs) throws Exception {
        ServiceResult result = updateUserRoleByUserIdThis(userId,  curUserId,  curUserName, roleIDs);
        return result;
    }

    /**
     * 更新用户角色的方法提取出来，这样新增和修改用户时也可以使用
     * @param userId
     * @param curUserId
     * @param curUserName
     * @param roleIDs
     * @return
     * @throws Exception
     */
    private ServiceResult updateUserRoleByUserIdThis(String userId, String curUserId, String curUserName, String... roleIDs) throws Exception {
        ServiceResult result = new ServiceResult();
        try {
            //先全部删除
            HashMap map = new HashMap();
            map.put("userId",userId);
            map.put("curUserId",curUserId);
            map.put("curUserName", curUserName);
            userRoleMapper.deleteUserRoleByUserId(map);

           // List<SysUserRoleDTO> userRoleDTOList = new ArrayList<>();
            for (String roleId : roleIDs) {
                if (StringUtil.isNotBlank(roleId)) {
                    SysUserRoleDTO userRoleDTO = new SysUserRoleDTO();
                    //设置字段值
                    UUID uuid = UUID.randomUUID();
                    userRoleDTO.setId(uuid.toString());
                    userRoleDTO.setUserId(userId);
                    userRoleDTO.setRoleId(roleId);
                    userRoleDTO.setIsDelete(0);
                    userRoleDTO.setCreateUserId(curUserId);
                    userRoleDTO.setCreateUserName(curUserName);
                    //由SQL获取current_time
                    //userRoleDTO.setCreateTime(new Date());
                    //插入不需要这三个字段
//                    userRoleDTO.setLastUpdateUserId(curUserId);
//                    userRoleDTO.setLastUpdateUserName(curUserName);
//                    userRoleDTO.setLastUpdateTime(new Date());

                   // userRoleDTOList.add(userRoleDTO);
                    //插入UserRole
                    userRoleMapper.addUserRole(userRoleDTO);
                }
            }
            //再批量插入？(可以实现mybatis的批量插入)
//            Integer rows = userRoleDAO.addUserRoleList(userRoleDTOList);
//            if(rows>0)
//                result = true;
            result.succeed("配置用户角色成功");

        } catch (Exception e) {
            result.succeed("配置用户角色失败");
            e.printStackTrace();
            throw e;
        }

        return result;
    }

    /** 更新用户
     * updateUser
     * @param userId
     * @param loginName
     * @param userName
     * @param password
     * @param roleIDs
     * @param mobile
     * @param email
     * @param curUserName
     * @param curUserId
     * @return
     * @throws Exception
     */
    public ServiceResult updateUser(String userId,String loginName,String userName,
                              String password,String roleIDs,String mobile,String email,
                              String curUserName,String curUserId) throws Exception {
        ServiceResult result = new ServiceResult();
        Date utilDate = new Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        try{
            SysUserDTO userDTO = baseMapper.getUserByUserId(userId);
            if(userDTO == null){
                return result.failed("未找到正确的用户");
            }else {
                userDTO.setLoginName(loginName);
                userDTO.setUserName(userName);
                String newPwd = "";
                newPwd = MD5Util.getMD5Encoding(MD5Util.MD5(password).toLowerCase()+ loginName);
                userDTO.setPassword(newPwd);
                //不需要非空判断
                userDTO.setMobile(mobile);
                userDTO.setEmail(email);
                userDTO.setLastUpdateUserId(curUserId);
                userDTO.setLastUpdateUserName(curUserName);
                userDTO.setLastUpdateTime(sqlDate);

                String [] roleIDArr = roleIDs.split(",");
                //更新用户和新增用户时
                //Boolean updateUserRoleByUserId(String userId, String curUserId, String curUserName, String... roleIDs)
                ServiceResult updateUserRoleResult = updateUserRoleByUserIdThis(userId, curUserId, curUserName, roleIDArr);
                if (!updateUserRoleResult.getIsSuccess()) {
                    return result.failed("更新用户失败！");
                }
                baseMapper.updateUser(userDTO);
                result.succeed("更新用户成功");
            }
        }catch (Exception e){
            result.failed("更新用户失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    /**
     * 解锁用户
     * @param userId
     * @param curUserId
     * @param curUserName
     * @return
     * @throws Exception
     */
    @Transactional("um")
    public ServiceResult unlockUser(String userId,String curUserId,String curUserName)throws Exception{
        ServiceResult result = new ServiceResult();

        SysUserDTO userDTO = new SysUserDTO();
        userDTO.setErrorCount(0);
        userDTO.setLastErrorTime(null);
        Date utilDate = new Date();
        java.sql.Date sqlDate=new java.sql.Date(utilDate.getTime());
        userDTO.setLastUpdateTime(sqlDate);
        userDTO.setLastUpdateUserId(curUserId);
        userDTO.setLastUpdateUserName(curUserName);

        try {
            baseMapper.updateUserErrorCount(userDTO);
            result.succeed("解锁成功");
        } catch (Exception e) {
            result.failed("解锁失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    /**
     * 更新用户状态（启用/禁用）
     * @param userId
     * @param status
     * @param curUserId
     * @param curUserName
     * @return
     * @throws Exception
     */
    @Transactional
    public ServiceResult updateUserStatus(String userId,Integer status,String curUserId,String curUserName)throws Exception{
        ServiceResult result = new ServiceResult();

        Map<String, Object> map = new HashMap<>();
        map.put("status", status);
        map.put("userId", userId);
        map.put("curUserId",curUserId);
        map.put("curUserName", curUserName);
        try {
            Integer rows = baseMapper.updateUserStatus(map);
            if (rows > 0)
                result.succeed("操作成功");
            else
                result.failed("操作无更改");
        } catch (Exception e) {
            result.failed("操作失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }


    /**
     * 新增用户
     * @param loginName
     * @param userName
     * @param password
     * @param roleIDs
     * @param mobile
     * @param email
     * @param curUserName
     * @param curUserId
     * @return
     */
    @Transactional("um")
    public ServiceResult addUser(String loginName,
                                 String userName,
                                 String password,
                                 String roleIDs,
                                 String mobile,
                                 String email,
                                 String curUserName,
                                 String curUserId )throws Exception{

        ServiceResult result = new ServiceResult();
        SysUserDTO userDTO = new SysUserDTO();

        Date utilDate=new Date();
        java.sql.Date sqlDate=new java.sql.Date(utilDate.getTime());
        String newPwd = MD5Util.getMD5Encoding(MD5Util.MD5(password).toLowerCase()+ loginName);
        String userId= UUID.randomUUID().toString();
        //设置字段值
        userDTO.setId(userId);
        userDTO.setLoginName(loginName);
        userDTO.setUserName(userName);
        userDTO.setPassword(newPwd);
        userDTO.setStatus(0);
        userDTO.setIsSuperAdmin(0);
        userDTO.setErrorCount(0);
        userDTO.setIsDelete(0);
        userDTO.setCreateUserName(curUserName);
        userDTO.setCreateUserId(curUserId);
        userDTO.setCreateTime(sqlDate);
        //不需要非空判断
        userDTO.setMobile(mobile);
        userDTO.setEmail(email);

        try {
            baseMapper.addUser(userDTO);

            //关联用户角色
            //if(roleID != null &&  (!"".equals(roleID))){
            //关联用户角色,多选时？
            if (StringUtil.isNotBlank(roleIDs)) {
                String[] roleIDArr = roleIDs.split(",");
                //使用
                ServiceResult updateUserRoleResult = updateUserRoleByUserIdThis(userId, curUserId, curUserName, roleIDArr);
                if (!updateUserRoleResult.getIsSuccess()) {
                    return result.failed("新增用户失败！");
                }
           }

            result.succeed("添加用户成功");

        } catch (Exception e) {
            result.failed("添加用户失败");
            e.printStackTrace();
            throw e;
        }

        return result;
    }

//    /**
//     * 分页查询用户列表
//     * @param pagin
//     * @return
//     * @throws Exception
//     */
//    public List<SysUserExtDTO> getUserListByPagination(Pagination pagin)throws Exception{
//        List<SysUserExtDTO> userExtDTOS = baseMapper.getUserList(pagin);
//        return userExtDTOS;
//    }
//
//    /**
//     * 用户列表总数
//     * @param pagin
//     * @return
//     * @throws Exception
//     */
//    public Integer getUserListCount(Pagination pagin)throws Exception{
//        Integer totalCount = baseMapper.getUserListCount(pagin);
//        return totalCount;
//    }

    public Pagination getUserList(Pagination pagination)throws Exception {
        pagination.setRecords(baseMapper.getUserList(pagination));
        pagination.setTotalCount(baseMapper.getUserListCount(pagination));
        return pagination;
    }

    /** 根据用户Id 查询用户的角色
     * selectRoleByUserId =》selectRoleMapByUserId
     * @param userId
     * @return
     * @throws Exception
     */
    public List<Map<String,String>> selectRoleMapByUserId(String userId)throws Exception {
        //return userDAO.selectRoleByUserId(userId);
        List<UserFindRoleOperationDTO> dtoList =  baseMapper.selectRoleOperationListByUserId(userId);
        List<Map<String, String>> mapList = new ArrayList<>();
        if (dtoList.size() > 0) {
            for(UserFindRoleOperationDTO po:dtoList){
                Map<String,String> _mMap = new HashMap<String,String>();

                _mMap.put("rows", po.getRows().toString());
                _mMap.put("id",po.getId());
                _mMap.put("name", po.getName());
                _mMap.put("parentId", po.getParentId());
                _mMap.put("gSequence", po.getSequence().toString());
                _mMap.put("hasrole", po.getHasrole());

                mapList.add(_mMap);
            }
        }
        return mapList;
    }

    /**
     * 删除用户（可批量）
     * @param idList
     * @param curUserId
     * @param curUserName
     * @return
     * @throws Exception
     */
    @Transactional("um")
    public ServiceResult deleteUser(List<String> idList,String curUserId,String curUserName)throws Exception{
        ServiceResult result = new ServiceResult();
        Map<String, Object> map = new HashMap<>();
        map.put("idList",idList);
        map.put("curUserId",curUserId);
        map.put("curUserName", curUserName);
        Integer rows =  baseMapper.deleteUser(map);
        if (rows > 0) {
            result.succeed("删除成功");
        }else{
            result.failed("删除失败");
        }
        return result;
    }



}
