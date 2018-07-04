<?php
/**
 * 写基础配置文件
 * @param $data
 */
function writeConfig($data)
{
    $path = APP_ROOT . '/config/group.conf';
    @file_put_contents($path, serialize($data));
    return true;
}

//读配置文件
function readConfig()
{
    $path = APP_ROOT . '/config/group.conf';
    $conf = file_get_contents($path);
    if(empty($conf))
        return [];

    return unserialize($conf);
}

//写聊天配置
function writeCtConfig($data)
{
    $path = APP_ROOT . '/config/chat.conf';
    @file_put_contents($path, serialize($data));
    return true;
}

//读聊天配置文件
function readCtConfig()
{
    $path = APP_ROOT . '/config/chat.conf';
    $conf = file_get_contents($path);
    if(empty($conf))
        return [];

    return unserialize($conf);
}



