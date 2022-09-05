-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Sze 05. 12:02
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `dolcevita`
--
CREATE DATABASE IF NOT EXISTS `dolcevita` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `dolcevita`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menu_item`
--

CREATE TABLE `menu_item` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `price` int(6) DEFAULT NULL,
  `imgPath` varchar(60) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `course` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `menu_item`
--

INSERT INTO `menu_item` (`id`, `name`, `price`, `imgPath`, `course`) VALUES
(1, 'Antipasto Board', 3000, 'images/starters/antipasto_board', 'Starter'),
(2, 'Tomato Bruschetta', 1500, 'images/starters/bruschetta', 'Starter'),
(3, 'Burrata with Tomatoes & Spinach', 2000, 'images/starters/burrata', 'Starter'),
(4, 'Calamari', 3500, 'images/starters/calamari', 'Starter'),
(5, 'Garlic Bread', 1000, 'images/starters/garlic_bread', 'Starter'),
(6, 'Garlic Bread with Tomato', 1250, 'images/starters/garlic_bread_tomato', 'Starter'),
(7, 'Italian Hummus', 2000, 'images/starters/hummus', 'Starter'),
(8, 'Crispy Fried Mozzarella', 2500, 'images/starters/mozzarella', 'Starter'),
(9, 'Olives', 1000, 'images/starters/olives', 'Starter'),
(10, 'King Prawns', 4000, 'images/starters/prawn', 'Starter'),
(11, 'Chicken Alfredo Tagliatelle', 4500, 'images/pasta/alfredo', 'Pasta'),
(12, 'Penne Arrabbiata', 3500, 'images/pasta/arrabbiata', 'Pasta'),
(13, 'Spaghetti Bolognese', 4000, 'images/pasta/bolognese', 'Pasta'),
(14, 'Spaghetti Carbonara', 4000, 'images/pasta/carbonara', 'Pasta'),
(15, 'Traditional Lasagne', 4500, 'images/pasta/lasagna', 'Pasta'),
(16, 'Spaghetti with King Prawns', 5500, 'images/pasta/prawn_spag', 'Pasta'),
(17, 'Crab & Lobster Ravioli with King Prawn', 7000, 'images/pasta/ravioli_prawn', 'Pasta'),
(18, 'Pea & Ricotta Ravioli', 5000, 'images/pasta/ravioli_ricotta', 'Pasta'),
(19, 'Penne Alla Rusticana', 4500, 'images/pasta/rusticana', 'Pasta'),
(20, 'Oak-Smoked Salmon Penne', 6000, 'images/pasta/salmon_penne', 'Pasta'),
(21, 'Tre Carni Calzone', 5500, 'images/pizza/calzone', 'Pizza'),
(22, 'Chicken, Peppers & Olives', 5000, 'images/pizza/chicken_pizza', 'Pizza'),
(23, 'Erba Cipollina & Prawns', 5500, 'images/pizza/cipollina_pizza', 'Pizza'),
(24, 'Margherita', 4000, 'images/pizza/margherita_pizza', 'Pizza'),
(25, 'Artichoke, Mushroom & Mascarpone', 4500, 'images/pizza/mushroom_pizza', 'Pizza'),
(26, 'Pepperoni', 4500, 'images/pizza/pepperoni_pizza', 'Pizza'),
(27, 'Dolce e Piccante', 5500, 'images/pizza/picante_pizza', 'Pizza'),
(28, 'Smoked Salmon & Sour Cream', 6000, 'images/pizza/salmon_pizza', 'Pizza'),
(29, 'Tre Gusti', 5500, 'images/pizza/tre_gusti_pizza', 'Pizza'),
(30, 'The House Burger', 6000, 'images/main/burger', 'Main'),
(31, 'Chicken Caesar Salad', 4500, 'images/main/caesar_salad', 'Main'),
(32, 'Grilled Chicken Breast with Grilled Vege', 6000, 'images/main/chicken_breast', 'Main'),
(33, 'Chicken, Hummus & Avocado Salad', 5500, 'images/main/chicken_salad', 'Main'),
(34, 'Salmon & Avocado', 7000, 'images/main/salmon', 'Main'),
(35, 'House Fries', 1000, 'images/sides/fries', 'Side'),
(36, 'Garlic Bread', 1000, 'images/sides/garlic_bread', 'Side'),
(37, 'Mixed Salad', 1000, 'images/sides/salad', 'Side'),
(38, 'Summer Salad', 1500, 'images/sides/salad2', 'Side'),
(39, 'Blackcurrant & Prosecco Cheesecake', 2000, 'images/desserts/black_cake', 'Dessert'),
(40, 'Triple Chocolate Tart', 2000, 'images/desserts/choco_tart', 'Dessert'),
(41, 'Chocolate Cookies', 1500, 'images/desserts/cookie', 'Dessert'),
(42, 'Chocolate Fudge Cake', 2000, 'images/desserts/fudge_cake', 'Dessert'),
(43, 'Italian Gelato or Sorbetto (3 scoops)', 2000, 'images/desserts/gelato', 'Dessert'),
(44, 'Honeycomb SMash Cheesecake', 2000, 'images/desserts/honey_cake', 'Dessert'),
(45, 'Sticky Toffee Pudding', 2500, 'images/desserts/pudding', 'Dessert'),
(46, 'Dolce Sundae', 2500, 'images/desserts/sundae', 'Dessert');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `address` varchar(40) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `city` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `postcode` varchar(10) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `country` varchar(30) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `mobile` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `email` varchar(60) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `messageFromUser` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `menu_item`
--
ALTER TABLE `menu_item`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemId` (`itemId`),
  ADD KEY `orderId` (`orderId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `menu_item`
--
ALTER TABLE `menu_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT a táblához `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `menu_item` (`id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
