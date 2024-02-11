-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2024 at 04:17 PM
-- Server version: 11.2.2-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cami`
--

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `bus_number` int(11) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`bus_number`, `latitude`, `longitude`, `active_status`) VALUES
(1, 9.9312328, 76.2673041, 0),
(2, 11.343, 34.2323, 0),
(3, 11.8745, 75.3704, 0),
(4, 9.2323, 75.121, 0),
(5, 9.32, 75.213423, 0),
(6, 50, 50, 0);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `msg_id` int(11) NOT NULL,
  `subject` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `sent_time` timestamp NULL DEFAULT current_timestamp(),
  `rec-year` text DEFAULT '["All"]',
  `rec-dept` text DEFAULT '["All"]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`msg_id`, `subject`, `description`, `sent_time`, `rec-year`, `rec-dept`) VALUES
(3, 'hello', 'asdasdasdas', '2024-02-11 09:34:21', '[\"All\"]', '[\"All\"]'),
(4, 'Hello World', 'This is a sample message to IT 2024', '2024-02-11 09:35:06', '[\"2024\"]', '[\"IT\"]');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `register_number` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `admission_year` year(4) NOT NULL,
  `bus_from` text DEFAULT NULL,
  `bus_number` int(11) DEFAULT NULL,
  `pass_status` tinyint(1) DEFAULT NULL,
  `amount_paid` varchar(255) DEFAULT NULL,
  `paid_on` date DEFAULT NULL,
  `pass_expires_on` date DEFAULT NULL,
  `dob` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`register_number`, `email_id`, `full_name`, `department`, `admission_year`, `bus_from`, `bus_number`, `pass_status`, `amount_paid`, `paid_on`, `pass_expires_on`, `dob`) VALUES
('2022014', 'ethan.lee@example.com', 'Dora', 'IT', '2022', 'Campus', 2, 1, '110', '2023-04-13', '2023-10-13', '123'),
('2022015', 'ava.moore@example.com', 'Ava Moore', 'Computer Science', '2022', 'Campus', 3, 1, '100', '2023-05-04', '2023-11-04', '123'),
('2022016', 'oliver.robinson@example.com', 'Oliver Robinson', 'Electrical Engineering', '2022', 'Campus', 4, 1, '90', '2023-05-09', '2023-11-09', '123'),
('2022017', 'amelia.king@example.com', 'Amelia King', 'Mechanical Engineering', '2022', 'Campus', 5, 1, '130', '2023-05-14', '2023-11-14', '123'),
('2022018', 'matthew.scott@example.com', 'Matthew Scott', 'Civil Engineering', '2022', 'Campus', 6, 1, '110', '2023-05-19', '2023-11-19', '123'),
('2022019', 'charlotte.allen@example.com', 'Charlotte Allen', 'Chemical Engineering', '2022', 'Campus', 1, 1, '105', '2023-06-04', '2023-12-04', '123'),
('2022020', 'mia.young@example.com', 'Mia Young', 'Aerospace Engineering', '2022', 'Campus', 2, 1, '115', '2023-06-09', '2023-12-09', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`bus_number`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`register_number`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
