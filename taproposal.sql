-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Agu 2020 pada 18.21
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taproposal`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `name`, `hashed_password`) VALUES
(1, 'Admin', '$2b$12$DD6XgZuGJua2ceGcW6giJeyisGcjV1awnhVsxfLxjjeB7OERYsmsW'),
(2, 'admin', '$2b$12$aH5gzaG6hpQAE2OgZXqAyuLTfL9FCsSb1nehI69F0.jnVoMfnH1Jy'),
(3, 'Dimas', 'admin12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `app_setting`
--

CREATE TABLE `app_setting` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `setting_value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `app_setting`
--

INSERT INTO `app_setting` (`id`, `name`, `setting_value`) VALUES
(1, 'period_id', '1'),
(2, 'coba', '1'),
(5, 'marom', '4');

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive`
--

CREATE TABLE `archive` (
  `id` int(11) NOT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `fromModel` varchar(255) DEFAULT NULL,
  `originalRecord` longtext DEFAULT NULL,
  `originalRecordId` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `clo`
--

CREATE TABLE `clo` (
  `id` int(11) NOT NULL,
  `clo_code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `plo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `clo_rubric`
--

CREATE TABLE `clo_rubric` (
  `id` int(11) NOT NULL,
  `rubric_code` double DEFAULT NULL,
  `score` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `clo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `eprt`
--

CREATE TABLE `eprt` (
  `id` int(11) NOT NULL,
  `score` varchar(255) DEFAULT NULL,
  `eprtUrl` varchar(255) DEFAULT NULL,
  `eprtFd` varchar(255) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `eprt`
--

INSERT INTO `eprt` (`id`, `score`, `eprtUrl`, `eprtFd`, `student_id`) VALUES
(1, '212', 'https://18b3c62a.ngrok.io/upload-eprt/1', 'application/pdf', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `final_project`
--

CREATE TABLE `final_project` (
  `id` int(11) NOT NULL,
  `topic_title` varchar(255) DEFAULT NULL,
  `topic_title_status` varchar(255) DEFAULT NULL,
  `file_link` varchar(255) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `reviewer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `total_students` double DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `peminatan_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `group`
--

INSERT INTO `group` (`id`, `total_students`, `period_id`, `peminatan_id`) VALUES
(1, 5, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `group_student`
--

CREATE TABLE `group_student` (
  `id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `group_student`
--

INSERT INTO `group_student` (`id`, `group_id`, `student_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `guidance_form`
--

CREATE TABLE `guidance_form` (
  `id` int(11) NOT NULL,
  `formUrl` varchar(255) DEFAULT NULL,
  `formFd` varchar(255) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `guidance_form`
--

INSERT INTO `guidance_form` (`id`, `formUrl`, `formFd`, `student_id`) VALUES
(1, 'https://18b3c62a.ngrok.io/upload-form/1', 'C:\\xampp\\htdocs\\all-sails\\ta\\aplikasita1\\.tmp\\uploads\\887b22c3-e3c6-42c1-bcc2-a61987d56c4f.pdf', 1),
(4, 'https://18b3c62a.ngrok.io/upload-form/2', 'C:\\xampp\\htdocs\\all-sails\\ta\\aplikasita1\\.tmp\\uploads\\dae70456-f346-4a9e-b364-90101569d55f.pdf', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jfa`
--

CREATE TABLE `jfa` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `abbrev` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `jfa`
--

INSERT INTO `jfa` (`id`, `name`, `abbrev`) VALUES
(1, 'test', 'tes');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kk`
--

CREATE TABLE `kk` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `abbrev` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kk`
--

INSERT INTO `kk` (`id`, `name`, `abbrev`) VALUES
(1, 'test', 'test'),
(2, 's', 'tes'),
(3, 'Coba', 'coba');

-- --------------------------------------------------------

--
-- Struktur dari tabel `lecturer`
--

CREATE TABLE `lecturer` (
  `id` int(11) NOT NULL,
  `nik` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `new_password_token` varchar(255) DEFAULT NULL,
  `new_password_token_expires_at` longtext DEFAULT NULL,
  `lecturer_code` varchar(255) DEFAULT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `jfa_id` int(11) DEFAULT NULL,
  `kk_id` int(11) DEFAULT NULL,
  `peminatan_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `lecturer`
--

INSERT INTO `lecturer` (`id`, `nik`, `name`, `email`, `hashed_password`, `new_password_token`, `new_password_token_expires_at`, `lecturer_code`, `role_id`, `jfa_id`, `kk_id`, `peminatan_id`) VALUES
(1, 1234, 'bu jaja', 'singgih.aji2010@gmail.com', '$2b$12$DD6XgZuGJua2ceGcW6giJeyisGcjV1awnhVsxfLxjjeB7OERYsmsW', NULL, NULL, 'JJA', '1', 1, 1, 1),
(6, 12345, 'Bu Dosen', 'budosen@gmail.com', '$2b$12$syaNrknbzzeueTxlewFXBu24NaGVO7TY5yp/NyWmBgs/.b/YMjnYG', NULL, NULL, 'DSN', '1', 1, 1, 1),
(8, 123456, 'Dimas AL', 'dimas@gmail.com', 'dosen12', NULL, NULL, 'DMS', '1', 1, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_role`
--

CREATE TABLE `master_role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `master_role`
--

INSERT INTO `master_role` (`id`, `role`) VALUES
(1, 'Dosen Pembina'),
(2, 'Dosen Penguji'),
(3, 'Dosen Metlit'),
(4, 'Koor Metlit');

-- --------------------------------------------------------

--
-- Struktur dari tabel `metlit`
--

CREATE TABLE `metlit` (
  `id` int(11) NOT NULL,
  `class` varchar(255) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `metlit`
--

INSERT INTO `metlit` (`id`, `class`, `period_id`) VALUES
(1, 'SI-41-05', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mycontroller`
--

CREATE TABLE `mycontroller` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminatan`
--

CREATE TABLE `peminatan` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `abbrev` varchar(255) DEFAULT NULL,
  `kk_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `peminatan`
--

INSERT INTO `peminatan` (`id`, `name`, `abbrev`, `kk_id`) VALUES
(1, 'Technopreneur', 'ESD', NULL),
(3, 'Technopreneursz', 'Tess', NULL),
(5, 'Technopreneursz', 'z', NULL),
(6, 'Technopre', 'zs', NULL),
(7, 'Database', 'DTB', NULL),
(8, 'Data Miining', 'EDM', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `period`
--

CREATE TABLE `period` (
  `id` int(11) NOT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `academic_year` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `period`
--

INSERT INTO `period` (`id`, `semester`, `academic_year`) VALUES
(1, 'GANJIL', '2019/2020'),
(2, 'GANJIL', '2020/2021'),
(3, 'GANJIL', '2020'),
(4, 'GANJIL', '2020/2021');

-- --------------------------------------------------------

--
-- Struktur dari tabel `plo`
--

CREATE TABLE `plo` (
  `id` int(11) NOT NULL,
  `plo_code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `project_clo_rubric`
--

CREATE TABLE `project_clo_rubric` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `clo_rubric_id` int(11) DEFAULT NULL,
  `given_by_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `nim` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `new_password_token` varchar(255) DEFAULT NULL,
  `new_password_token_expires_at` longtext DEFAULT NULL,
  `ipk` decimal(10,0) DEFAULT NULL,
  `peminatan_id` int(11) DEFAULT NULL,
  `kk_id` int(11) DEFAULT NULL,
  `metlit_id` int(11) DEFAULT NULL,
  `ta_id` int(11) DEFAULT NULL,
  `eprt_id` int(11) DEFAULT NULL,
  `form_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `student`
--

INSERT INTO `student` (`id`, `nim`, `name`, `email`, `class`, `hashed_password`, `new_password_token`, `new_password_token_expires_at`, `ipk`, `peminatan_id`, `kk_id`, `metlit_id`, `ta_id`, `eprt_id`, `form_id`) VALUES
(1, 1202170069, 'DIMAS NASHIRUDDIN AL FARUQ', 'dimasna@student.telkomuniversity.ac.id', '', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `ta`
--

CREATE TABLE `ta` (
  `id` int(11) NOT NULL,
  `taUrl` varchar(255) DEFAULT NULL,
  `taFd` varchar(255) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `ta`
--

INSERT INTO `ta` (`id`, `taUrl`, `taFd`, `student_id`) VALUES
(6, 'https://18b3c62a.ngrok.io/upload-ta/1', 'ta/C:\\xampp\\htdocs\\all-sails\\ta\\aplikasita1\\.tmp\\uploads\\d9e7e22c-b319-480c-a844-1a38b44701e0.pdf', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `topic`
--

CREATE TABLE `topic` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quota` double DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `kk_id` int(11) DEFAULT NULL,
  `peminatan_id` int(11) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `lecturer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `topic`
--

INSERT INTO `topic` (`id`, `name`, `quota`, `is_deleted`, `kk_id`, `peminatan_id`, `period_id`, `lecturer_id`) VALUES
(1, '1', 5, 0, 1, 1, 1, 1),
(2, 'Sails JS Indonesi', 5, 0, NULL, 1, 1, 1),
(3, 'UI / UX', 5, 0, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `topic_selection`
--

CREATE TABLE `topic_selection` (
  `id` int(11) NOT NULL,
  `optionNum` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `app_setting`
--
ALTER TABLE `app_setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `archive`
--
ALTER TABLE `archive`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `clo`
--
ALTER TABLE `clo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `clo_rubric`
--
ALTER TABLE `clo_rubric`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `eprt`
--
ALTER TABLE `eprt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indeks untuk tabel `final_project`
--
ALTER TABLE `final_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `group_student`
--
ALTER TABLE `group_student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `guidance_form`
--
ALTER TABLE `guidance_form`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indeks untuk tabel `jfa`
--
ALTER TABLE `jfa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `abbrev` (`abbrev`);

--
-- Indeks untuk tabel `kk`
--
ALTER TABLE `kk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `abbrev` (`abbrev`);

--
-- Indeks untuk tabel `lecturer`
--
ALTER TABLE `lecturer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nik` (`nik`);

--
-- Indeks untuk tabel `master_role`
--
ALTER TABLE `master_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `metlit`
--
ALTER TABLE `metlit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `mycontroller`
--
ALTER TABLE `mycontroller`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `peminatan`
--
ALTER TABLE `peminatan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `abbrev` (`abbrev`);

--
-- Indeks untuk tabel `period`
--
ALTER TABLE `period`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `plo`
--
ALTER TABLE `plo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `project_clo_rubric`
--
ALTER TABLE `project_clo_rubric`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nim` (`nim`);

--
-- Indeks untuk tabel `ta`
--
ALTER TABLE `ta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indeks untuk tabel `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeks untuk tabel `topic_selection`
--
ALTER TABLE `topic_selection`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `app_setting`
--
ALTER TABLE `app_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `archive`
--
ALTER TABLE `archive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `clo`
--
ALTER TABLE `clo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `clo_rubric`
--
ALTER TABLE `clo_rubric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `eprt`
--
ALTER TABLE `eprt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `final_project`
--
ALTER TABLE `final_project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `group_student`
--
ALTER TABLE `group_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `guidance_form`
--
ALTER TABLE `guidance_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `jfa`
--
ALTER TABLE `jfa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `kk`
--
ALTER TABLE `kk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `lecturer`
--
ALTER TABLE `lecturer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `master_role`
--
ALTER TABLE `master_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `metlit`
--
ALTER TABLE `metlit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `mycontroller`
--
ALTER TABLE `mycontroller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `peminatan`
--
ALTER TABLE `peminatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `period`
--
ALTER TABLE `period`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `plo`
--
ALTER TABLE `plo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `project_clo_rubric`
--
ALTER TABLE `project_clo_rubric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `ta`
--
ALTER TABLE `ta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `topic_selection`
--
ALTER TABLE `topic_selection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
