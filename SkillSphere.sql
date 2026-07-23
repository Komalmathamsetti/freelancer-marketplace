--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2026-07-22 13:12:12

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
-- TOC entry 219 (class 1259 OID 25049)
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    client_id integer,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    category character varying(100),
    budget numeric(10,2),
    experience_level character varying(50),
    deadline date,
    location character varying(150),
    status character varying(30) DEFAULT 'Open'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    required_skills text
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25048)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 218
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 225 (class 1259 OID 25108)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    reciever_id integer NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    edited boolean DEFAULT false
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25107)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 224
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 229 (class 1259 OID 25156)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(50) NOT NULL,
    related_id integer,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 25155)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 228
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 217 (class 1259 OID 25032)
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    user_id integer,
    bio text,
    skills text,
    hourly_rate integer,
    experience character varying(100),
    portfolio text,
    company_name character varying(150),
    company_description text,
    website character varying(200),
    contact_number character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    resume_url text
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25031)
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profiles_id_seq OWNER TO postgres;

--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 216
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- TOC entry 221 (class 1259 OID 25065)
-- Name: proposals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proposals (
    id integer NOT NULL,
    job_id integer NOT NULL,
    freelancer_id integer NOT NULL,
    proposal_text text NOT NULL,
    bid_amount numeric(10,2) NOT NULL,
    estimated_days integer NOT NULL,
    status character varying(30) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.proposals OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25064)
-- Name: proposals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proposals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proposals_id_seq OWNER TO postgres;

--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 220
-- Name: proposals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proposals_id_seq OWNED BY public.proposals.id;


--
-- TOC entry 227 (class 1259 OID 25130)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    client_id integer,
    freelancer_id integer,
    job_id integer,
    rating integer,
    review text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25129)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 226
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 223 (class 1259 OID 25088)
-- Name: saved_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_jobs (
    id integer NOT NULL,
    freelancer_id integer,
    job_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.saved_jobs OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25087)
-- Name: saved_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.saved_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 222
-- Name: saved_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_jobs_id_seq OWNED BY public.saved_jobs.id;


--
-- TOC entry 215 (class 1259 OID 25018)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255),
    role character varying(20) NOT NULL,
    phone character varying(15),
    profile_image text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    provider character varying(20) DEFAULT 'LOCAL'::character varying,
    otp character varying(6),
    otp_expiry timestamp without time zone,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['client'::character varying, 'freelancer'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25017)
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
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3214 (class 2604 OID 25052)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 25111)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 25159)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 25035)
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 25068)
-- Name: proposals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposals ALTER COLUMN id SET DEFAULT nextval('public.proposals_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 25133)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 25091)
-- Name: saved_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_jobs ALTER COLUMN id SET DEFAULT nextval('public.saved_jobs_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 25021)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3416 (class 0 OID 25049)
-- Dependencies: 219
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, client_id, title, description, category, budget, experience_level, deadline, location, status, created_at, required_skills) FROM stdin;
20	2	Backend Developer 	Design, develop, and maintain scalable server-side applications and RESTful APIs using modern backend technologies. Build and optimize database schemas, implement secure authentication and authorization, integrate third-party services, and ensure application performance, reliability, and security. Collaborate with frontend developers and cross-functional teams to deliver robust, maintainable, and high-quality software solutions while following industry best practices.	Backend Development	40000.00	Beginner	2026-08-19	Bengaluru	Open	2026-07-22 09:50:28.526594	Node.js,Express.js,PostgreSQL,JavaScript
11	2	Python Backend Developer	Develop REST APIs with Django and PostgreSQL.	Backend Development	40000.00	Intermediate	2026-09-04	Hyderabad	Open	2026-07-18 12:51:37.828082	Python,Node.js,Express, MySQL
18	7	Content Writer	Write SEO-friendly technical blogs and website content.	Content Writing	100000.00	Beginner	2026-07-23	Remote	Open	2026-07-20 17:30:55.148214	Creative Writing,Copywriting,Storytelling,Blog Writing,SEO Content Writing,Editing & Proofreading,Research Skills,Content Strategy
14	7	Machine Learning Engineer	Build and deploy predictive machine learning models.	AI/ML	80000.00	Experienced	2026-12-21	Bengaluru	Closed	2026-07-18 12:55:53.945256	Python,Machine Learning,Deep Learning,TensorFlow,PyTorch,Scikit-learn,Data Preprocessing,SQL
13	7	Mobile App Developer	Create an Android application using Flutter.	Mobile Development	55000.00	Experienced	2026-10-21	Chennai	Closed	2026-07-18 12:54:38.401815	Flutter, React Native, Kotlin, Java, Swift, Android Studio, Firebase, REST APIs
12	7	UI/UX designer	Design modern web and mobile app interfaces in Figma.	Design	18000.00	Beginner	2026-11-10	Mumbai	Open	2026-07-18 12:53:31.878368	Figma, Adobe XD, Wireframing, Prototyping, User Research, Interaction Design, Visual Design, Usability Testing
10	2	Data Analyst	We are looking for a detail-oriented Data Analyst to transform raw data into meaningful insights that support business decisions. The ideal candidate should have strong analytical skills, experience with SQL and data visualization tools, and the ability to communicate findings effectively.\n\nKey Responsibilities\n1)Collect, clean, and validate data from multiple sources.\n2)Analyze large datasets to identify trends, patterns, and business opportunities.\n3)Develop dashboards and reports using tools like Power BI or Tableau.\n4)Write efficient SQL queries to extract and manipulate data.\n5)Perform statistical analysis and data modeling.\n6)Collaborate with business teams to understand reporting requirements.\n7)Present findings through visualizations and presentations.\n8)Monitor key performance indicators (KPIs) and recommend improvements.\n9)Automate recurring reports and data pipelines where possible.\n10)Ensure data accuracy, integrity, and security.	Analyst	1000000.00	Beginner	2026-09-09	Delhi	Open	2026-07-17 12:56:53.977439	SQL, Microsoft Excel, Python, Power BI, Tableau, Data Visualization, Data Cleaning, Statistical Analysis
\.


--
-- TOC entry 3422 (class 0 OID 25108)
-- Dependencies: 225
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, sender_id, reciever_id, message, created_at, edited) FROM stdin;
1	1	2	Hello	2026-07-13 11:55:53.099283	f
2	2	1	Hi\n	2026-07-13 14:33:27.849169	f
6	2	1	Hi	2026-07-13 16:38:16.771296	f
7	1	2	Heelo	2026-07-13 16:39:59.401545	f
10	2	1	Hey potsbkjdbk	2026-07-13 16:58:03.093437	f
11	1	2	What r u doing?	2026-07-13 17:12:08.965923	f
12	2	6	Hi	2026-07-15 11:10:31.513769	f
14	6	2	Hlo	2026-07-15 12:19:06.404827	f
21	6	2	Hi	2026-07-15 12:45:16.526116	f
5	1	2	Hello??	2026-07-13 16:37:57.9291	t
22	6	7	Hi madam	2026-07-18 13:10:51.27307	f
\.


--
-- TOC entry 3426 (class 0 OID 25156)
-- Dependencies: 229
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, title, message, type, related_id, is_read, created_at) FROM stdin;
4	6	Proposal Accepted 🎉	Your proposal for "Machine Learning Engineer" has been accepted.	PROPOSAL_ACCEPTED	14	f	2026-07-20 13:44:36.080622
6	6	New Job Posted	A new job '${job.rows[0].title}' has been posted.	JOB	17	f	2026-07-20 17:06:49.058864
8	6	New Job Posted	A new job "Content Writer" has been posted.	JOB	\N	f	2026-07-20 17:30:55.166064
3	1	Proposal Accepted 🎉	Your proposal for "Mobile App Developer" has been accepted.	PROPOSAL_ACCEPTED	13	t	2026-07-20 13:43:52.239492
7	1	New Job Posted	A new job "Content Writer" has been posted.	JOB	\N	t	2026-07-20 17:30:55.162969
9	7	New Application	Komal applied for 'Content Writer	APPLICATION	18	t	2026-07-20 17:34:19.68792
2	7	Application Withdrawn	Komal withdrew the application for "Machine Learning Engineer".	WITHDRAW	14	t	2026-07-20 13:41:06.424866
1	7	New Application	Komal applied for 'Machine Learning Engineer	APPLICATION	14	t	2026-07-20 13:39:53.003407
10	7	Application Withdrawn	Komal withdrew the application for "Content Writer".	WITHDRAW	18	t	2026-07-20 18:01:45.011551
12	6	New Job Posted	A new job "Backend Developer" has been posted.	JOB	\N	f	2026-07-22 09:37:40.897155
13	11	New Job Posted	A new job "Backend Developer" has been posted.	JOB	\N	f	2026-07-22 09:37:40.907999
15	6	New Job Posted	A new job "Backend Developer " has been posted.	JOB	\N	f	2026-07-22 09:50:28.546071
16	11	New Job Posted	A new job "Backend Developer " has been posted.	JOB	\N	f	2026-07-22 09:50:28.548161
17	6	Job Updated	The job "Python Backend Developer" has been updated.	JOB_UPDATE	11	f	2026-07-22 10:32:54.225648
18	6	Job Updated	The job "Machine Learning Engineer" has been updated.	JOB_UPDATE	14	f	2026-07-22 10:42:16.643393
19	1	Job Updated	The job "Mobile App Developer" has been updated.	JOB_UPDATE	13	t	2026-07-22 10:42:45.492268
14	1	New Job Posted	A new job "Backend Developer " has been posted.	JOB	\N	t	2026-07-22 09:50:28.541864
11	1	New Job Posted	A new job "Backend Developer" has been posted.	JOB	\N	t	2026-07-22 09:37:40.887766
\.


--
-- TOC entry 3414 (class 0 OID 25032)
-- Dependencies: 217
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, user_id, bio, skills, hourly_rate, experience, portfolio, company_name, company_description, website, contact_number, created_at, resume_url) FROM stdin;
3	6	As a seasoned freelancer with 1 year of experience, I bring expertise in AI/ML, SQL, UI/UX design, app development, HTML, and Python. With a client-focused attitude, I deliver tailored solutions that meet unique needs. My problem-solving ability enables me to navigate complex challenges and provide innovative results. I am committed to delivering high-quality work with a strong attention to detail, and I am available to work at an hourly rate of ₹500/hr. I am dedicated to building long-term relationships with my clients, providing them with effective and efficient solutions that exceed their expectations.	AI/ML,SQL,UI/UX design,App development,HTML,Python	500	1 year	https://github.com/pardhu-mathamsetti					2026-07-18 13:06:25.579452	/uploads/resumes/1784443578409-415822515.pdf
2	2	\N	\N	\N	\N	\N	Accenture	Accenture is a global professional services company specializing in digital transformation, cloud computing, cybersecurity, artificial intelligence, data analytics, and technology consulting. The company helps organizations innovate, optimize operations, and accelerate business growth by delivering end-to-end technology and consulting solutions across multiple industries. Accenture serves clients in more than 120 countries with a strong focus on innovation, sustainability, and business transformation.	https://www.accenture.com	+91 80 4106 0000	2026-06-30 13:49:17.114181	\N
1	1	As a seasoned freelancer with 2 years of experience, I specialize in developing robust and scalable solutions using HTML, Tailwind CSS, JavaScript, Node.js, React.js, PostgreSQL, Express.js, and C++. With a strong expertise in these technologies, I deliver high-quality results with a client-focused attitude, ensuring timely and effective solutions. My problem-solving ability enables me to tackle complex challenges and provide innovative solutions, making me a reliable partner for businesses and individuals alike, all at an affordable hourly rate of ₹200/hr.	HTML,Tailwind CSS,JavaScript,Node.js,React,js,PostgreSQL,Express.js,C++	200	2 Years	https://melodious-chaja-d241cb.netlify.app/					2026-06-30 12:01:44.820428	/uploads/resumes/1784437838602-489474123.pdf
4	7			\N	\N		Delloitte	Deloitte is one of the world's leading professional services firms, providing consulting, audit, tax, risk advisory, and financial advisory services. Operating in over 150 countries, Deloitte helps organizations solve complex business challenges through innovation, technology, and industry expertise. It is recognized for its collaborative work culture, commitment to professional growth, and focus on delivering impactful solutions to clients across various industries.	www.delloitte.com	+91 8872917006	2026-07-18 15:02:48.312108	\N
\.


--
-- TOC entry 3418 (class 0 OID 25065)
-- Dependencies: 221
-- Data for Name: proposals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proposals (id, job_id, freelancer_id, proposal_text, bid_amount, estimated_days, status, created_at) FROM stdin;
11	11	6	I am excited to apply for your Python Backend Developer project. I have experience building secure, scalable, and efficient backend applications using Python and modern frameworks such as Django and Flask. I can develop RESTful APIs, integrate databases, implement authentication, optimize application performance, and ensure clean, maintainable code following industry best practices. I am committed to understanding your project requirements, maintaining clear communication throughout the development process, and delivering high-quality, reliable solutions within the agreed timeline. I look forward to working with you and contributing to the success of your project.\n	40000.00	45	Rejected	2026-07-18 13:28:26.002751
14	13	1	I am excited to apply for your Mobile App Development project. I have experience developing responsive, user-friendly, and high-performance mobile applications with clean, maintainable code and modern development practices. I can build feature-rich Android and cross-platform applications, integrate APIs and databases, implement secure authentication, optimize app performance, and ensure a smooth user experience across devices. I am committed to understanding your project requirements, maintaining clear communication throughout the development process, and delivering a reliable, high-quality application within the agreed timeline. I look forward to working with you and turning your app idea into a successful product.\n	50000.00	45	Accepted	2026-07-20 08:51:31.629519
10	14	6	I am excited to apply for your AI/ML project. I have a strong foundation in Python, machine learning, and data analysis, with experience building intelligent solutions that solve real-world problems. I can develop, train, and optimize machine learning models, preprocess and analyze data, and deliver scalable, well-documented solutions tailored to your requirements. I am committed to writing clean, efficient code, maintaining clear communication throughout the project, and delivering high-quality results within the agreed timeline. I look forward to collaborating with you and helping turn your ideas into a successful AI-powered solution.\n	80000.00	60	Accepted	2026-07-18 13:09:36.848371
\.


--
-- TOC entry 3424 (class 0 OID 25130)
-- Dependencies: 227
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, client_id, freelancer_id, job_id, rating, review, created_at) FROM stdin;
\.


--
-- TOC entry 3420 (class 0 OID 25088)
-- Dependencies: 223
-- Data for Name: saved_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_jobs (id, freelancer_id, job_id, created_at) FROM stdin;
\.


--
-- TOC entry 3412 (class 0 OID 25018)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password, role, phone, profile_image, created_at, updated_at, provider, otp, otp_expiry) FROM stdin;
2	VarahalaRao	varahalarao@gmail.com	$2b$10$JKL2Y.KeXeV.pPFNPHHW2uediMKdgE0FBs/ck9u6jwbzNFhg9b/QG	client	986842876	\N	2026-06-29 14:04:24.378056	2026-06-29 14:04:24.378056	LOCAL	\N	\N
4	KomalMathamsetti	admin@gmail.com	$2b$10$jOHrHSZTW0mS8XJ47O.rGeTOGeAxxu1dzfQT9CfcWO8wV8wXUkKmK	admin	8885489886	\N	2026-07-08 11:21:57.585663	2026-07-08 11:21:57.585663	LOCAL	\N	\N
7	Sasi	sasi@gmail.com	$2b$10$xBqeg0tXa.qWnPyJ.gjw6.B8DQO2NcGvM6ipyXrolH8/hUDmcyz.a	client	8564726289	\N	2026-07-18 12:52:20.704118	2026-07-18 12:52:20.704118	LOCAL	\N	\N
1	Komal	komal@gmail.com	$2b$10$mGfU7Qed.AQWPicN2X4l8.qiTNVwbH9OCdVj.fvebW5UjCfyazAiy	freelancer	9876543210	\N	2026-06-26 13:00:28.838129	2026-06-26 13:00:28.838129	LOCAL	\N	\N
6	Pardha Sai Satya Pradeeep	pardhu@gmail.com	$2b$10$IgCpNKVNp8csxBI4AzwKM.NK2Zy2aV25MfB8dAaaFva/R9747bAhW	freelancer	9866842876	\N	2026-07-11 10:20:09.095017	2026-07-11 10:20:09.095017	LOCAL	\N	\N
10	Revanth	revanth8288@gmail.com	$2b$10$kTLO37ffHZiA7zuzF3jIEerHYg1KY5W.80liOyTJLhYkhGQVhtpE.	client	8459832457	\N	2026-07-21 12:09:50.432197	2026-07-21 12:09:50.432197	LOCAL	\N	\N
11	Komal	komalmathamsetti@gmail.com	$2b$10$MpD6TGnRDZqSPu6WHru.bepnYgPCrrFqzyuo6sRt9/4Qv4s9S3qi2	freelancer	8885489886	\N	2026-07-22 08:50:49.148586	2026-07-22 08:50:49.148586	LOCAL	\N	\N
\.


--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 218
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 20, true);


--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 224
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 22, true);


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 228
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 19, true);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 216
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_id_seq', 4, true);


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 220
-- Name: proposals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proposals_id_seq', 16, true);


--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 226
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 222
-- Name: saved_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_jobs_id_seq', 8, true);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- TOC entry 3241 (class 2606 OID 25058)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3249 (class 2606 OID 25116)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 25165)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 25040)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 25042)
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 3243 (class 2606 OID 25074)
-- Name: proposals proposals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposals
    ADD CONSTRAINT proposals_pkey PRIMARY KEY (id);


--
-- TOC entry 3251 (class 2606 OID 25139)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 25096)
-- Name: saved_jobs saved_jobs_freelancer_id_job_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_jobs
    ADD CONSTRAINT saved_jobs_freelancer_id_job_id_key UNIQUE (freelancer_id, job_id);


--
-- TOC entry 3247 (class 2606 OID 25094)
-- Name: saved_jobs saved_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_jobs
    ADD CONSTRAINT saved_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 25030)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3235 (class 2606 OID 25028)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 1259 OID 25173)
-- Name: idx_notifications_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_created ON public.notifications USING btree (created_at DESC);


--
-- TOC entry 3253 (class 1259 OID 25172)
-- Name: idx_notifications_read; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_read ON public.notifications USING btree (is_read);


--
-- TOC entry 3254 (class 1259 OID 25171)
-- Name: idx_notifications_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_user ON public.notifications USING btree (user_id);


--
-- TOC entry 3268 (class 2606 OID 25166)
-- Name: notifications fk_notification_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3258 (class 2606 OID 25059)
-- Name: jobs jobs_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3263 (class 2606 OID 25122)
-- Name: messages messages_reciever_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_reciever_id_fkey FOREIGN KEY (reciever_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3264 (class 2606 OID 25117)
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3257 (class 2606 OID 25043)
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3259 (class 2606 OID 25080)
-- Name: proposals proposals_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposals
    ADD CONSTRAINT proposals_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3260 (class 2606 OID 25075)
-- Name: proposals proposals_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proposals
    ADD CONSTRAINT proposals_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- TOC entry 3265 (class 2606 OID 25140)
-- Name: reviews reviews_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3266 (class 2606 OID 25145)
-- Name: reviews reviews_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3267 (class 2606 OID 25150)
-- Name: reviews reviews_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- TOC entry 3261 (class 2606 OID 25097)
-- Name: saved_jobs saved_jobs_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_jobs
    ADD CONSTRAINT saved_jobs_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3262 (class 2606 OID 25102)
-- Name: saved_jobs saved_jobs_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_jobs
    ADD CONSTRAINT saved_jobs_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


-- Completed on 2026-07-22 13:12:13

--
-- PostgreSQL database dump complete
--

