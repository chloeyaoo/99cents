--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appreciation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appreciation (
    id integer NOT NULL,
    sender_id integer,
    recipient_id integer,
    amount numeric(3,2) NOT NULL,
    message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT appreciation_amount_check CHECK ((amount <= 0.99))
);


ALTER TABLE public.appreciation OWNER TO postgres;

--
-- Name: appreciation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appreciation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appreciation_id_seq OWNER TO postgres;

--
-- Name: appreciation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appreciation_id_seq OWNED BY public.appreciation.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: appreciation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appreciation ALTER COLUMN id SET DEFAULT nextval('public.appreciation_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
1	John	john@example.com	$2a$10$/es0vTPSY08If6WIS6mv/uz9E2uZjFEyMe8Ut4jBnWmuU8GWc2Fgy
2	Mary	mary@example.com	$2a$10$I9TuaY67O5xp/phe9JvM.ufCGQU7d6IBHfFcYiACUDTriEfMRdnIK
3	Paul	paul@example.com	$2a$10$y.3vuorVf/4LksEcpyedvOJuvk4Gg5EiIWn8Vijj1IXOwWDTB6J6m
4	Lisa	lisa@example.com	$2a$10$5xbcXGLc7Qk3BvBrpto2Ku9B191sKqiJDM6YE3V6afIBjX6/Pg7v.
5	Steve	steve@example.com	$2a$10$cl7mSp02HMFvLlxYtv9dd.dBt8SJiOG5HW75xVS3lhiQYiTi2xdTW
6	Susan	susan@example.com	$2a$10$oEwOKaiU.qwJhTanMw3bnO8CacP2ADNhGGnlVs1pFZrpsHRlitoVC
7	Mike	mike@example.com	$2a$10$.AaMoWEYKXNjzdJusNfpO.8fMHSLfqcKf10Opz/NzutntrraGuxnW
8	Anna	anna@example.com	$2a$10$Ie5hmNRkrre.Il5HqiVhtuakOt4tM7yTVG6KbmuDwa9j6Kbpvd2HC
9	David	david@example.com	$2a$10$PqZ2Ptg33wikdldHJUSZHeLzXnK2wIiKijRlBZubY86MSVbUL95a.
10	Julia	julia@example.com	$2a$10$hMKtz6Hcn9NE.2myrMVBW.i6ZTX745XKiqzNB66P.N/Vj712cGiPO
\.

--
-- Data for Name: appreciation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appreciation (id, sender_id, recipient_id, amount, message, created_at) FROM stdin;
1	1	2	0.50	Thanks for your help, Mary!	2024-10-01 10:00:00
2	1	3	0.75	Great job on the project, Paul!	2024-10-02 11:00:00
3	1	4	0.25	Appreciate your effort, Lisa!	2024-10-03 09:30:00
4	1	5	0.80	Well done, Steve!	2024-10-04 08:45:00
5	1	6	0.99	Keep up the good work, Susan!	2024-10-05 12:15:00
6	1	7	0.45	Awesome support, Mike!	2024-09-15 14:20:00
7	1	8	0.30	You are fantastic, Anna!	2024-09-16 10:30:00
8	1	9	0.60	Great collaboration, David!	2024-09-17 16:00:00
9	1	10	0.50	Thanks for the quick help, Julia!	2024-09-18 15:45:00
10	1	2	0.55	Amazing work, Mary!	2024-09-19 13:00:00
11	1	2	0.55	Amazing work, Mary!	2024-09-20 13:00:00
12	1	2	0.55	Amazing work, Mary!	2024-09-21 13:00:00
13	1	2	0.55	Amazing work, Mary!	2024-09-22 13:00:00
14	1	2	0.55	Amazing work, Mary!	2024-09-23 13:00:00
15	1	2	0.55	Amazing work, Mary!	2024-09-24 13:00:00
16	1	2	0.55	Amazing work, Mary!	2024-09-25 13:00:00
17	1	2	0.55	Amazing work, Mary!	2024-09-26 13:00:00
18	1	2	0.55	Amazing work, Mary!	2024-09-27 13:00:00
19	1	2	0.55	Amazing work, Mary!	2024-09-28 13:00:00
20	2	1	0.60	Thank you for the support, John!	2024-10-07 09:00:00
21	2	3	0.99	You did amazing, Paul!	2024-10-08 10:45:00
22	2	4	0.25	Great teamwork, Lisa!	2024-10-09 08:30:00
23	2	5	0.75	Nice work, Steve!	2024-10-10 11:15:00
24	2	6	0.99	Fantastic effort, Susan!	2024-10-11 14:00:00
25	3	1	0.70	Much appreciated, John!	2024-10-05 10:00:00
26	3	2	0.40	You rock, Mary!	2024-10-06 12:30:00
27	3	4	0.25	Awesome work, Lisa!	2024-10-07 09:45:00
28	3	5	0.75	Superb, Steve!	2024-10-08 13:00:00
29	3	6	0.99	Excellent, Susan!	2024-10-09 15:30:00
30	4	1	0.50	Great help, John!	2024-10-02 11:00:00
31	4	2	0.99	Wonderful job, Mary!	2024-10-03 14:00:00
32	4	3	0.25	Thanks a lot, Paul!	2024-10-04 10:15:00
33	4	5	0.75	You are amazing, Steve!	2024-10-05 13:30:00
34	4	6	0.99	Keep it up, Susan!	2024-10-06 09:00:00
35	5	1	0.50	Fantastic, John!	2024-09-20 08:45:00
36	5	2	0.99	Could not have done it without you, Mary!	2024-09-21 10:00:00
37	5	3	0.25	You are the best, Paul!	2024-09-22 12:00:00
38	5	4	0.75	Super helpful, Lisa!	2024-09-23 14:15:00
39	5	6	0.99	Awesome effort, Susan!	2024-09-24 16:30:00
40	6	1	0.60	Great work, John!	2024-10-01 09:30:00
41	6	2	0.80	Thank you so much, Mary!	2024-10-02 10:45:00
42	6	3	0.70	Impressive, Paul!	2024-10-03 14:20:00
43	6	4	0.65	Great effort, Lisa!	2024-10-04 13:00:00
44	6	5	0.85	Fantastic work, Steve!	2024-10-05 15:30:00
45	7	1	0.50	Impressive work, John!	2024-10-01 08:00:00
46	7	3	0.85	Really appreciate it, Paul!	2024-10-02 11:30:00
47	7	4	0.45	Thank you, Lisa!	2024-10-03 14:45:00
48	7	5	0.95	Great job, Steve!	2024-10-04 16:00:00
49	7	6	0.70	Well done, Susan!	2024-10-05 10:30:00
50	8	2	0.95	Amazing job, Mary!	2024-09-29 12:00:00
51	8	4	0.50	Thanks for the help, Lisa!	2024-09-30 13:45:00
52	8	5	0.40	Great contribution, Steve!	2024-10-01 10:15:00
53	8	6	0.70	Well done, Susan!	2024-10-02 11:00:00
54	8	7	0.60	Great effort, Mike!	2024-10-03 14:30:00
55	9	1	0.60	Nice effort, John!	2024-10-04 08:45:00
56	9	2	0.55	You are fantastic, Mary!	2024-10-05 10:00:00
57	9	3	0.45	Wonderful work, Paul!	2024-10-06 12:15:00
58	9	4	0.75	Awesome, Lisa!	2024-10-07 09:30:00
59	9	5	0.85	Great, Steve!	2024-10-08 11:45:00
60	10	1	0.60	Well done, John!	2024-10-01 09:00:00
61	10	2	0.75	Amazing, Mary!	2024-10-02 11:00:00
62	10	3	0.50	Great job, Paul!	2024-10-03 10:45:00
63	10	4	0.65	Keep it up, Lisa!	2024-10-04 14:00:00
64	10	5	0.95	Excellent work, Steve!	2024-10-05 16:00:00
\.




--
-- Name: appreciation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appreciation_id_seq', 64, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: appreciation appreciation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appreciation
    ADD CONSTRAINT appreciation_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: appreciation appreciation_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appreciation
    ADD CONSTRAINT appreciation_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.users(id);


--
-- Name: appreciation appreciation_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appreciation
    ADD CONSTRAINT appreciation_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

