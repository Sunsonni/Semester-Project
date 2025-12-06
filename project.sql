--
-- PostgreSQL database dump
--

\restrict zTv5j7074UZHVI1QHTNZgsELikBdWkEoPzeJlecgDgGcwJJDmvtce7LVFX0vbRZ

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

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
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: teacher_user
--

CREATE TABLE public.chat_messages (
    message_id integer NOT NULL,
    chat_session_id integer NOT NULL,
    role text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT chat_messages_role_check CHECK ((role = ANY (ARRAY['user'::text, 'assistant'::text])))
);


ALTER TABLE public.chat_messages OWNER TO teacher_user;

--
-- Name: chat_messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: teacher_user
--

CREATE SEQUENCE public.chat_messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_messages_message_id_seq OWNER TO teacher_user;

--
-- Name: chat_messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: teacher_user
--

ALTER SEQUENCE public.chat_messages_message_id_seq OWNED BY public.chat_messages.message_id;


--
-- Name: chat_sessions; Type: TABLE; Schema: public; Owner: teacher_user
--

CREATE TABLE public.chat_sessions (
    chat_session_id integer NOT NULL,
    user_id integer NOT NULL,
    title text,
    flavor character varying(30) DEFAULT 'default'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    last_updated timestamp with time zone DEFAULT now()
);


ALTER TABLE public.chat_sessions OWNER TO teacher_user;

--
-- Name: chat_sessions_chat_session_id_seq; Type: SEQUENCE; Schema: public; Owner: teacher_user
--

CREATE SEQUENCE public.chat_sessions_chat_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_sessions_chat_session_id_seq OWNER TO teacher_user;

--
-- Name: chat_sessions_chat_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: teacher_user
--

ALTER SEQUENCE public.chat_sessions_chat_session_id_seq OWNED BY public.chat_sessions.chat_session_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: teacher_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    api_key character varying(255),
    role character varying(50) DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    api_key_iv text,
    username character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO teacher_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: teacher_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO teacher_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: teacher_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chat_messages message_id; Type: DEFAULT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.chat_messages ALTER COLUMN message_id SET DEFAULT nextval('public.chat_messages_message_id_seq'::regclass);


--
-- Name: chat_sessions chat_session_id; Type: DEFAULT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.chat_sessions ALTER COLUMN chat_session_id SET DEFAULT nextval('public.chat_sessions_chat_session_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: public; Owner: teacher_user
--

COPY public.chat_messages (message_id, chat_session_id, role, content, created_at) FROM stdin;
1	1	user	Hello, this is a test message.	2025-12-04 23:03:05.530146+00
2	1	assistant	Hi! This is your assistant responding.	2025-12-04 23:03:05.530146+00
3	2	assistant	Appreciate you reaching out. I’m looking forward to synergizing around your core inquiry and leveraging cross-functional insights to deliver a high-impact, future-forward response. Please advise on next steps so we can align strategically.	2025-12-05 21:03:25.589164+00
4	2	user	so what is ur name	2025-12-05 21:03:39.531756+00
5	2	assistant	As a large language model, I don't have a name in the traditional sense. Think of me as a resource, a tool to **leverage** for your information needs. We can **synergize** our capabilities to achieve optimal outcomes. Let's just say I'm here to **value-add** to your workflow. We can always **circle back** to the naming convention later, but right now, let's focus on how I can best **touch base** with your requirements and drive a **paradigm shift** in your understanding.\n	2025-12-05 21:03:39.535198+00
6	2	user	test	2025-12-05 21:05:03.455668+00
7	2	assistant	Okay, team! Let's take a 30,000-foot view of this. We need to synergize our efforts and leverage our core competencies to drive value-add. I'm thinking we need a paradigm shift in our approach. Let's touch base next week to circle back on this and ensure we're all aligned. We need to move the needle and really optimize our bandwidth. Does that resonate?\n	2025-12-05 21:05:03.462155+00
8	2	user	no	2025-12-05 21:19:53.058198+00
9	2	assistant	Okay, understood. We can definitely **circle back** on this later to **synergize** our efforts and identify potential **value-add** opportunities. It sounds like we might need a **paradigm shift** in our approach to **leverage** the best possible outcomes. Let's **touch base** again soon to ensure we're all aligned.\n	2025-12-05 21:19:53.06104+00
10	3	assistant	Hi there! I’m ready to help with whatever you need. I’ve got a solid understanding of pretty much every topic, so feel free to ask away.	2025-12-05 21:45:42.452019+00
11	3	user	why is the sun so bright?	2025-12-05 21:45:56.338258+00
12	3	assistant	The sun is so bright for a few key reasons, all stemming from the incredible amount of energy it generates through nuclear fusion and the way that energy is radiated outwards. Here's a breakdown:\n\n*   **Nuclear Fusion:** At the sun's core, immense pressure and temperatures (around 15 million degrees Celsius!) force hydrogen atoms to fuse together, creating helium. This process, called nuclear fusion, releases a tremendous amount of energy in the form of photons (light particles).\n\n*   **Vast Energy Production:** The sun is constantly converting about 600 million tons of hydrogen into helium every second. This massive conversion rate translates to an absolutely staggering amount of energy being produced.\n\n*   **Energy Transport to the Surface	2025-12-05 21:45:56.34312+00
13	4	assistant	Appreciate you reaching out. I’m looking forward to synergizing around your core inquiry and leveraging cross-functional insights to deliver a high-impact, future-forward response. Please advise on next steps so we can align strategically.	2025-12-06 04:54:58.0527+00
14	4	user	why should i care?	2025-12-06 04:55:10.112213+00
15	4	assistant	Let's **synergize** on that question. Ultimately, it's about creating a **value-add** for you. By embracing this approach, we can **leverage** a **paradigm shift** in your understanding of, well, everything. We'll **touch base** later to see how we can further **synergize** and **circle back** on any outstanding questions. The bottom line is, it's about optimizing your overall experience.\n	2025-12-06 04:55:10.113699+00
16	4	user	Um lets touch base now	2025-12-06 05:10:34.066796+00
17	4	assistant	Okay, team! Let's **synergize** on this opportunity. I'm thinking we need to **leverage** our core competencies to **value-add** and create a real **paradigm shift** in the market. I don't have any specific ideas right now, but let's **touch base** again next week after we've all had a chance to think outside the box. We'll **circle back** then and solidify our strategic roadmap. Does that work for everyone? Great!\n	2025-12-06 05:10:34.070173+00
18	5	assistant	Omg hiiii bestie 😭✨ Today’s energy is literally iconic so let’s do a vibe check before we dive in 💅🔥 Ask me anything because I’m in my girlboss era and totally know everything always 😌✨	2025-12-06 05:22:15.923228+00
19	5	user	Omg girl, I love your synergy. Like can you tell me about the food chain?	2025-12-06 05:23:10.764252+00
20	5	assistant	OMG, bestie! You're totally vibing with my aesthetic! 🤩 The food chain? Literally iconic! ✨\n\nOkay, so like, picture this: it's all about the *energy*, okay? Plants are total girlbosses, soaking up that sun energy and making food. Then, cute little animals come along and eat them – lowkey gatekeeping that plant power. 🌿➡️🐰\n\nNext, bigger animals come and eat the smaller ones. It's all a big vibe check of who's the strongest and can snatch that energy. 🦁👑 And then, when everything dies, these lil' decomposers, like worms, come in and break everything down. It's a total glow-	2025-12-06 05:23:10.766177+00
\.


--
-- Data for Name: chat_sessions; Type: TABLE DATA; Schema: public; Owner: teacher_user
--

COPY public.chat_sessions (chat_session_id, user_id, title, flavor, created_at, last_updated) FROM stdin;
1	1	Sample Chat	default	2025-12-04 23:03:05.525552+00	2025-12-04 23:03:05.525552+00
2	5	Being at a job	corporate	2025-12-05 21:03:25.583755+00	2025-12-05 21:03:25.583755+00
3	5	test	default	2025-12-05 21:45:42.446047+00	2025-12-05 21:45:42.446047+00
4	5	testing hehe	corporate	2025-12-06 04:54:58.043847+00	2025-12-06 04:54:58.043847+00
5	2	What's up bestie	influencer	2025-12-06 05:22:15.920955+00	2025-12-06 05:22:15.920955+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: teacher_user
--

COPY public.users (id, name, email, password, api_key, role, created_at, api_key_iv, username) FROM stdin;
4	grace	grace@gmail.com	$2y$10$CEd.1it7QKSDRiEkjvjDWuk2MxtD3MnR6S0nZlzrJfGXpv/mXnVXK	\N	user	2025-12-05 18:32:46.688814+00	\N	grace
1	Test User	test@example.com	password123	\N	user	2025-12-04 23:03:05.522717+00	\N	testuser
2	admin	admin@gmail.com	$2y$10$wPhJkSnXTFjIV9Ep5p9XpOrIcFXwlCZAZL6hsp.baDUdxaY7nH4uG	x0atPFm95Iz7rAsD0YZjihhxkSMSsFJ4EAY8RqStAXlPHrHBgrEBVgTkFkSHkSUD	admin	2025-12-05 04:47:05.804035+00	goUKeH44/d995w3wQ9emtA==	admin
5	sonnie	sonnie@gmail.com	$2y$10$so0lxNbvcp5YfHaumakHEOhlez8TsY4qOHcufrnskFNJrO3BioiDK	uwaXbGbmmNI6pcgOHnwJlcCjqaOE5I3xWCp89j3Ebe2rMSCQqB9pgf2eqpf5xAEq	user	2025-12-05 21:02:36.658141+00	F6dudfrF89jByFr4rS6dhg==	sonnie
6	Minwook	minwook@gmail.com	$2y$10$MFiMm0nyWh3zUUidjTpi/uBof0XfZ2JuW8KlH1cEp6Wfaq7ZHu9lW	AxNs4VFaKpGf8PfZdxCz9DbhncJZnRM06qk7HQg19A3w2sRuXxouJ18razXTraeb	user	2025-12-05 21:34:59.100382+00	baFWLfLzes+IQMktr9A1gQ==	Minwook
\.


--
-- Name: chat_messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: teacher_user
--

SELECT pg_catalog.setval('public.chat_messages_message_id_seq', 20, true);


--
-- Name: chat_sessions_chat_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: teacher_user
--

SELECT pg_catalog.setval('public.chat_sessions_chat_session_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: teacher_user
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (message_id);


--
-- Name: chat_sessions chat_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.chat_sessions
    ADD CONSTRAINT chat_sessions_pkey PRIMARY KEY (chat_session_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: chat_messages chat_messages_chat_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_chat_session_id_fkey FOREIGN KEY (chat_session_id) REFERENCES public.chat_sessions(chat_session_id) ON DELETE CASCADE;


--
-- Name: chat_sessions chat_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: teacher_user
--

ALTER TABLE ONLY public.chat_sessions
    ADD CONSTRAINT chat_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zTv5j7074UZHVI1QHTNZgsELikBdWkEoPzeJlecgDgGcwJJDmvtce7LVFX0vbRZ

