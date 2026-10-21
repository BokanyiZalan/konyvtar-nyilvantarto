-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Okt 21. 09:53
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konyvtar_nyilvantarto`
--
CREATE DATABASE IF NOT EXISTS `konyvtar_nyilvantarto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `konyvtar_nyilvantarto`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `author` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `publish_year` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `category`, `publish_year`, `available`) VALUES
(2, 'A Pál utcai fiúk', 'Molnár Ferenc', 'Ifjúsági regény', 1906, 0),
(3, 'Tüskevár', 'Fekete István', 'Ifjúsági regény', 1957, 0),
(4, 'Abigél', 'Szabó Magda', 'Regény', 1970, 1),
(5, 'A kis herceg', 'Antoine de Saint-Exupéry', 'Mese', 1943, 0),
(6, '1984', 'George Orwell', 'Disztópia', 1949, 1),
(7, 'A hobbit', 'J. R. R. Tolkien', 'Fantasy', 1937, 0),
(8, 'Harry Potter és a bölcsek köve', 'J. K. Rowling', 'Fantasy', 1997, 1),
(9, 'Légy jó mindhalálig', 'Móricz Zsigmond', 'Regény', 1920, 1),
(10, 'A Gyűrűk Ura', 'J. R. R. Tolkien', 'Fantasy', 1954, 0),
(11, 'New Book', 'John Doe', 'Fiction', 2021, 1),
(12, 'New Book', 'John Doe', 'Fiction', 2021, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `reader_id` int(11) NOT NULL,
  `loan_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `loans`
--

INSERT INTO `loans` (`id`, `book_id`, `reader_id`, `loan_date`, `due_date`, `return_date`) VALUES
(2, 5, 2, '2026-10-02', '2026-10-16', NULL),
(4, 8, 4, '2026-10-04', '2026-10-18', '2023-01-20'),
(5, 10, 5, '2026-10-05', '2026-10-19', NULL),
(6, 2, 1, '2023-01-01', '2023-01-15', '2023-01-15'),
(7, 2, 1, '2023-01-01', '2026-12-15', '2026-11-15'),
(8, 2, 1, '2023-01-01', '2026-12-15', '2026-11-15'),
(9, 2, 1, '2023-01-01', '2026-12-15', '2026-11-15'),
(10, 2, 1, '2023-01-01', '2026-12-15', '2026-11-15'),
(11, 2, 1, '2023-01-01', '2026-12-15', '2026-11-15'),
(12, 2, 1, '2023-01-01', '2026-12-15', '2026-11-15'),
(23, 2, 3, '2023-01-01', '2026-12-15', '2026-11-15');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `readers`
--

CREATE TABLE `readers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `registered_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `readers`
--

INSERT INTO `readers` (`id`, `name`, `email`, `phone`, `registered_at`) VALUES
(2, 'Nagy Péter', 'peter@example.com', '06301234568', '2026-10-20 09:38:09'),
(3, 'Szabó Eszter', 'eszter@example.com', '06301234569', '2026-10-20 09:38:09'),
(4, 'Tóth Bence', 'bence@example.com', '06301234570', '2026-10-20 09:38:09'),
(5, 'Varga László', 'laszlo@example.com', '06301234571', '2026-10-20 09:38:09'),
(6, 'John Doe', 'john.doe@example.com', '123-456-7890', '2023-01-01 00:00:00');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `reader_id` (`reader_id`);

--
-- A tábla indexei `readers`
--
ALTER TABLE `readers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `readers`
--
ALTER TABLE `readers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
