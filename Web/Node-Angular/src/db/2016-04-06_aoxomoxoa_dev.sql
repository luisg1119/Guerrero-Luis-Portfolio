-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2016 at 07:15 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `aoxomoxoa_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contract`
--

CREATE TABLE IF NOT EXISTS `tbl_contract` (
  `int_contract_id` bigint(20) unsigned NOT NULL,
  `str_cid` varchar(10) NOT NULL,
  `dtm_cid_received` date NOT NULL,
  `str_wo` varchar(20) NOT NULL,
  `str_contract_num` varchar(50) NOT NULL,
  `str_ariba_pr_no` varchar(50) NOT NULL,
  `str_po` varchar(50) NOT NULL,
  `str_pco` varchar(50) NOT NULL,
  `str_cost_center` varchar(50) NOT NULL,
  `str_oracle_entity` varchar(10) NOT NULL,
  `str_responsibility_center` varchar(10) NOT NULL,
  `str_cafae` varchar(50) NOT NULL,
  `dbl_value` double NOT NULL,
  `dbl_cost` double NOT NULL,
  `bln_active` tinyint(1) NOT NULL,
  `bln_pending` tinyint(1) NOT NULL,
  `str_project_title` varchar(250) NOT NULL,
  `dtm_start` date NOT NULL,
  `dtm_end` date NOT NULL,
  `int_portfolio_manager_id` int(11) NOT NULL,
  `int_rept_mgr_id` int(11) NOT NULL,
  `int_sol_mgr_id` int(11) NOT NULL,
  `str_bill_type` varchar(20) NOT NULL,
  `str_client` varchar(20) NOT NULL,
  `str_contract_type` varchar(20) NOT NULL,
  `str_service_type` varchar(20) NOT NULL,
  `int_mpo_spoc_id` int(11) NOT NULL,
  `str_sow_location` varchar(50) NOT NULL,
  `str_sow_type` varchar(50) NOT NULL,
  `str_billing_currency` varchar(3) NOT NULL,
  `bln_exclude_from_vivar_upload` tinyint(1) NOT NULL,
  `bln_sdlc_billing_only` tinyint(1) NOT NULL,
  `bln_exclude_from_asn_billing` tinyint(1) NOT NULL,
  `str_remarks` varchar(1000) NOT NULL,
  `int_approver_level_8` int(11) NOT NULL,
  `int_approver_level_7` int(11) NOT NULL,
  `int_approver_level_6` int(11) NOT NULL,
  `int_approver_level_5` int(11) NOT NULL,
  `int_approver_level_4` int(11) NOT NULL,
  `int_approver_level_3` int(11) NOT NULL,
  `str_pcr_note` varchar(50) NOT NULL,
  `str_siebel_num` varchar(50) NOT NULL,
  `str_contract_record_type` varchar(5) NOT NULL COMMENT 'SOW;PCR',
  `dtm_elance_entry` date NOT NULL,
  `str_amex_sow_num` varchar(50) NOT NULL,
  `dtm_non_compliant_package` date NOT NULL,
  `dtm_po_received` date NOT NULL,
  `int_status_code` int(11) NOT NULL COMMENT '0;1;5;10',
  `int_result_status` int(11) NOT NULL COMMENT 'Booked;In GP Queue;In Elance;Canada;UK;Canceled',
  `str_bill_to_address_id` varchar(10) NOT NULL,
  `str_sold_to_address_id` varchar(10) NOT NULL,
  `str_remit_to_address_id` varchar(10) NOT NULL,
  `str_ship_to_address_id` varchar(10) NOT NULL,
  `str_ship_from_address_id` varchar(10) NOT NULL,
  `int_pay_in_number_days` int(11) NOT NULL COMMENT '0;1',
  `str_comments` varchar(5000) NOT NULL,
  `bln_notes` tinyint(1) NOT NULL,
  `bln_delete` tinyint(1) NOT NULL,
  `str_user_created` varchar(50) NOT NULL,
  `dtm_created` date NOT NULL,
  `str_user_modified` varchar(50) NOT NULL,
  `dtm_modified` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `tbl_contract`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_resource`
--

CREATE TABLE IF NOT EXISTS `tbl_resource` (
  `str_guid` char(36) NOT NULL,
  `str_export_blue_id` varchar(10) NOT NULL,
  `str_staffing_tool_id` varchar(10) NOT NULL,
  `str_ibm_serial` varchar(6) NOT NULL,
  `str_full_name` varchar(200) NOT NULL,
  `str_name_first` varchar(50) NOT NULL,
  `str_name_middle` varchar(50) NOT NULL,
  `str_name_last` varchar(50) NOT NULL,
  `str_email` varchar(100) NOT NULL,
  `str_country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `tbl_resource`:
--

--
-- Triggers `tbl_resource`
--
DELIMITER $$
CREATE TRIGGER `GUID_FILL` BEFORE INSERT ON `tbl_resource`
 FOR EACH ROW BEGIN
  IF new.str_guid = '' THEN
    SET new.str_guid = uuid();
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_resource_role`
--

CREATE TABLE IF NOT EXISTS `tbl_resource_role` (
  `int_resource_role` int(11) NOT NULL,
  `str_resource_guid` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `int_role_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `tbl_resource_role`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_role`
--

CREATE TABLE IF NOT EXISTS `tbl_role` (
  `int_role_id` int(11) NOT NULL,
  `str_role_name` varchar(75) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `tbl_role`:
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_contract`
--
ALTER TABLE `tbl_contract`
  ADD PRIMARY KEY (`int_contract_id`), ADD UNIQUE KEY `int_contract_id` (`int_contract_id`);

--
-- Indexes for table `tbl_resource`
--
ALTER TABLE `tbl_resource`
  ADD PRIMARY KEY (`str_guid`), ADD UNIQUE KEY `guid` (`str_guid`);

--
-- Indexes for table `tbl_resource_role`
--
ALTER TABLE `tbl_resource_role`
  ADD PRIMARY KEY (`int_resource_role`), ADD KEY `str_resource_guid` (`str_resource_guid`);

--
-- Indexes for table `tbl_role`
--
ALTER TABLE `tbl_role`
  ADD PRIMARY KEY (`int_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_contract`
--
ALTER TABLE `tbl_contract`
  MODIFY `int_contract_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_resource_role`
--
ALTER TABLE `tbl_resource_role`
  MODIFY `int_resource_role` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `tbl_role`
--
ALTER TABLE `tbl_role`
  MODIFY `int_role_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
