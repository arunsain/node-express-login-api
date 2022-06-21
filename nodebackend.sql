-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2022 at 09:38 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodebackend`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(400) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `password` varchar(400) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'geeta bhatia', 'geeta.weblance@gmail.com', '$2a$10$RwqH5KGwPjAUGEfCIuxQmuJwWIIlYaWv9njrFaRTOC6O9dDekqMRK', '2022-04-15 04:42:54'),
(2, 'manu bhatia', 'geetamanu@gmail.com', '$2a$10$C4rhKFd2/SVS/3F6dIAWZePkD52wNw5hTMozbUpVZQ2SzqsZOSsyK', '2022-04-15 04:56:14'),
(3, 'sonu 45u65u4usain', 'arunsain3ruuu66@gmail.com', '$2a$10$fmLRm9uHHIdhLeM58c5R2.kAog6Ur71a3sKlRXEF.HF87z4gavweK', '2022-04-15 05:32:55'),
(4, 'arun sain', 'arunsain322@gmail.com', '$2a$10$KhbG0wXa8QN1icd7M7aX7eOysuGsiUjidxis7rg4vEmemywSo2Luy', '2022-06-21 07:26:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
