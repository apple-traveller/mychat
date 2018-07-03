-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 �?07 �?01 �?17:25
-- 服务器版本: 5.5.53
-- PHP 版本: 5.6.27

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `layim`
--

-- --------------------------------------------------------

--
-- 表的结构 `chat_log`
--

CREATE TABLE IF NOT EXISTS `chat_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromid` varchar(55) NOT NULL DEFAULT '0' COMMENT '会话来源id',
  `fromname` varchar(155) NOT NULL DEFAULT '' COMMENT '消息来源用户名',
  `fromavatar` varchar(155) NOT NULL DEFAULT '' COMMENT '来源的用户头像',
  `toid` varchar(155) NOT NULL DEFAULT '“”' COMMENT '会话发送的id',
  `content` text NOT NULL COMMENT '发送的内容',
  `timeline` int(10) NOT NULL COMMENT '记录时间',
  `type` varchar(55) NOT NULL COMMENT '聊天类型',
  PRIMARY KEY (`id`),
  KEY `fromid` (`fromid`) USING BTREE,
  KEY `toid` (`toid`) USING BTREE
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

--
-- 转存表中的数据 `chat_log`
--

INSERT INTO `chat_log` (`id`, `fromid`, `fromname`, `fromavatar`, `toid`, `content`, `timeline`, `type`) VALUES
(1, '5b388e1ec63d7', '5b388e1ec63d7', '/static/common/images/passerby.jpg', '2', 'face[困] ', 1530433059, 'friend'),
(2, '5b388e1ec63d7', '5b388e1ec63d7', '/static/common/images/passerby.jpg', '2', 'face[哼] ', 1530433111, 'friend'),
(3, '5b389e88e5ecf', '5b389e88e5ecf', '/static/common/images/passerby.jpg', '2', 'face[鼓掌] ', 1530437271, 'friend'),
(4, '2', '马云', '/static/common/images/common.jpg', '5b389e88e5ecf', 'face[晕] ', 1530437279, 'friend'),
(5, '4', '4', '/static/common/images/passerby.jpg', '2', 'face[睡] ', 1530438443, 'friend'),
(6, '2', '马云', '/static/common/images/common.jpg', '4', 'face[思考] ', 1530438467, 'friend'),
(7, '2', '马云', '/static/common/images/common.jpg', '4', '4', 1530438469, 'friend'),
(8, '4', '4', '/static/common/images/passerby.jpg', '2', 'face[怒骂] ', 1530438475, 'friend'),
(9, '4', '4', '/static/common/images/passerby.jpg', '2', 'face[悲伤] ', 1530438500, 'friend'),
(10, '10', '10', '/static/common/images/passerby.jpg', '2', 'face[黑线] ', 1530438528, 'friend'),
(11, '2', '马云', '/static/common/images/common.jpg', '10', 'face[悲伤] ', 1530438547, 'friend'),
(12, '1530438597', '1530438597', '/static/common/images/passerby.jpg', '2', 'face[馋嘴] ', 1530438601, 'friend'),
(13, '2', '马云', '/static/common/images/common.jpg', '1530438597', 'face[耶] ', 1530438607, 'friend'),
(14, '', '', '', '2', 'face[晕] ', 1530438825, 'friend'),
(15, '1530438597', '1530438597', '/static/common/images/passerby.jpg', '2', 'face[悲伤] ', 1530438858, 'friend'),
(16, '2', '马云', '/static/common/images/common.jpg', '1530438597', 'img[/uploads/20180701/b6c30d84439043162f22ac92a0a08d86.jpg]', 1530438872, 'friend'),
(17, '1530438597', '1530438597', '/static/common/images/passerby.jpg', '2', 'face[失望] ', 1530438999, 'friend'),
(18, '1530439016', '1530439016', '/static/common/images/passerby.jpg', '2', 'face[心] ', 1530439021, 'friend'),
(19, '2', '马云', '/static/common/images/common.jpg', '1530439016', 'face[吐] ', 1530439028, 'friend'),
(20, '', '', '', '2', '34', 1530441429, 'friend'),
(21, '1530441826', '1530441826', 'http://www.laychat.com/static/common/images/passerby.jpg', '2', 'face[钱] ', 1530441834, 'friend'),
(22, '1530441826', '1530441826', 'http://www.laychat.com/static/common/images/passerby.jpg', '2', 'face[拜拜] ', 1530447688, 'friend'),
(23, '1530441826', '1530441826', 'http://www.laychat.com/static/common/images/passerby.jpg', '2', 'face[黑线] ', 1530449364, 'friend'),
(24, '2', '马云', '/static/common/images/common.jpg', '1530441826', 'face[黑线] ', 1530449381, 'friend'),
(25, '', '', '', '2', '问', 1530461298, 'friend'),
(26, '', '', '', '2', '33', 1530461363, 'friend'),
(27, '1530464772', '1530464772', 'http://www.laychat.com/static/common/images/passerby.jpg', '2', 'face[兔子] ', 1530464825, 'friend'),
(28, '1530464772', '1530464772', 'http://www.laychat.com/static/common/images/passerby.jpg', '2', 'face[熊猫] ', 1530464842, 'friend'),
(29, '2', '马云', '/static/common/images/common.jpg', '1530464772', 'face[黑线] ', 1530464850, 'friend'),
(30, '2', '马云', '/static/common/images/common.jpg', '1530464772', 'face[白眼] ', 1530464871, 'friend'),
(31, '', '', '', '2', 'face[鼓掌] ', 1530464909, 'friend'),
(32, '1', '纸飞机', '/static/common/images/common.jpg', '2', 'face[ok] ', 1530465573, 'friend'),
(33, '2', '马云', '/static/common/images/common.jpg', '1', 'er', 1530465579, 'friend'),
(34, '1', '纸飞机', '/static/common/images/common.jpg', '2', 'face[黑线] ', 1530465584, 'friend'),
(35, '1530464772', '1530464772', 'http://www.laychat.com/static/common/images/passerby.jpg', '2', 'face[晕] ', 1530465634, 'friend');

-- --------------------------------------------------------

--
-- 表的结构 `chat_user`
--

CREATE TABLE IF NOT EXISTS `chat_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(155) DEFAULT NULL,
  `password` varchar(155) DEFAULT NULL COMMENT '密码',
  `sign` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '0下线 1在线',
  `iskefu` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `chat_user`
--

INSERT INTO `chat_user` (`id`, `username`, `password`, `sign`, `avatar`, `status`, `iskefu`) VALUES
(1, '纸飞机', '21232f297a57a5a743894a0e4a801fc3', '我来测试', '/static/common/images/common.jpg', 1, 1),
(2, '马云', '21232f297a57a5a743894a0e4a801fc3', '我视金钱为粪土', '/static/common/images/common.jpg', 1, 1),
(3, '罗玉凤', '21232f297a57a5a743894a0e4a801fc3', '在自己实力不济的时候，不要去相信什么媒体和记者。他们不是善良的人，有时候候他们的采访对当事人而言就是陷阱', '/static/common/images/common.jpg', 0, 0),
(4, '马化腾', '21232f297a57a5a743894a0e4a801fc3', '让天下没有难写的代码', '/static/common/images/common.jpg', 0, 1),
(7, '访客5b360b9baf298', 'cdd707229af403dc788047c8e18d7a00', '到此一游', '/static/common/images/passerby.jpg', 0, 0),
(8, '访客5b36115994909', '0e487a61a7bc9807718865deebd3594b', '到此一游', '/static/common/images/passerby.jpg', 0, 0),
(9, '访客5b36e48412b56', '38712c9543a8818201007d488bd959be', '到此一游', '/static/common/images/passerby.jpg', 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
