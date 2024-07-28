import type { Course, CourseDetails } from './types'
import { getPublicUrl } from '@/server/utils/getPublicUrl'

const avatar1 = getPublicUrl('/images/avatars/avatar-1.png')
const avatar2 = getPublicUrl('/images/avatars/avatar-2.png')
const avatar3 = getPublicUrl('/images/avatars/avatar-3.png')
const avatar5 = getPublicUrl('/images/avatars/avatar-5.png')
const avatar6 = getPublicUrl('/images/avatars/avatar-6.png')
const avatar8 = getPublicUrl('/images/avatars/avatar-8.png')
const avatar9 = getPublicUrl('/images/avatars/avatar-9.png')
const avatar12 = getPublicUrl('/images/avatars/avatar-12.png')
const avatar13 = getPublicUrl('/images/avatars/avatar-13.png')
const avatar14 = getPublicUrl('/images/avatars/avatar-14.png')
const avatar15 = getPublicUrl('/images/avatars/avatar-15.png')

const tutorImg1 = getPublicUrl('/images/pages/app-academy-tutor-1.png')
const tutorImg2 = getPublicUrl('/images/pages/app-academy-tutor-2.png')
const tutorImg3 = getPublicUrl('/images/pages/app-academy-tutor-3.png')
const tutorImg4 = getPublicUrl('/images/pages/app-academy-tutor-4.png')
const tutorImg5 = getPublicUrl('/images/pages/app-academy-tutor-5.png')
const tutorImg6 = getPublicUrl('/images/pages/app-academy-tutor-6.png')

interface DB {
  courses: Course[]
  courseDetails: CourseDetails
}

export const db: DB = {
  courses: [
    {
      id: 1,
      user: 'Lauretta Coie',
      image: avatar1,
      tutorImg: tutorImg1,
      completedTasks: 19,
      totalTasks: 25,
      userCount: 18,
      note: 20,
      view: 83,
      time: '17h 34m',
      logo: 'ri-angularjs-line',
      color: 'error',
      courseTitle: 'Basics of Angular',
      desc: 'Introductory course for Angular and framework basics with TypeScript',
      tags: 'Web',
      rating: 4.4,
      ratingCount: 8,
    },
    {
      id: 2,
      user: 'Maybelle Zmitrovich',
      tutorImg: tutorImg2,
      image: avatar2,
      completedTasks: 48,
      totalTasks: 52,
      userCount: 14,
      note: 48,
      view: 43,
      time: '19h 17m',
      logo: 'ri-palette-line',
      color: 'warning',
      desc: 'Learn how to design a beautiful & engaging mobile app with Figma',
      courseTitle: 'UI/UX Design',
      tags: 'Design',
      rating: 4.9,
      ratingCount: 10,
    },
    {
      id: 3,
      user: 'Gertie Langwade',
      image: avatar2,
      tutorImg: tutorImg3,
      completedTasks: 87,
      totalTasks: 100,
      userCount: 19,
      note: 81,
      view: 88,
      time: '16h 16m',
      logo: 'ri-reactjs-line',
      color: 'info',
      desc: 'Master React.js: Build dynamic web apps with front-end technology',
      courseTitle: 'React Native',
      tags: 'Web',
      rating: 4.8,
      ratingCount: 9,
    },
    {
      id: 4,
      user: 'Estella Chace',
      image: avatar3,
      completedTasks: 33,
      tutorImg: tutorImg4,
      totalTasks: 50,
      userCount: 28,
      note: 21,
      view: 87,
      time: '15h 49m',
      logo: 'ri-pencil-line',
      color: 'success',
      courseTitle: 'Art & Drawing',
      desc: 'Easy-to-follow video & guides show you how to draw animals & people.',
      tags: 'Design',
      rating: 4.7,
      ratingCount: 18,

    },
    {
      id: 5,
      user: 'Euell Bownass',
      tutorImg: tutorImg5,
      image: avatar14,
      completedTasks: 100,
      totalTasks: 100,
      userCount: 13,
      note: 19,
      view: 13,
      time: '12h 42m',
      logo: 'ri-star-smile-line',
      color: 'primary',
      courseTitle: 'Basic Fundamentals',
      desc: 'Learn the basics of the most popular programming language.',
      tags: 'Web',
      rating: 4.6,
      ratingCount: 11,
    },
    {
      id: 6,
      user: 'Terrye Etches',
      tutorImg: tutorImg6,
      image: avatar3,
      completedTasks: 23,
      totalTasks: 25,
      userCount: 78,
      note: 36,
      view: 36,
      time: '1h 42m',
      logo: 'ri-reactjs-line',
      color: 'info',
      courseTitle: 'React for Beginners',
      desc: 'Learn React in just a couple of afternoons with this immersive course',
      tags: 'Web',
      rating: 4.5,
      ratingCount: 68,
    },
    {
      id: 7,
      user: 'Papageno Sloy',
      tutorImg: tutorImg1,
      image: avatar14,
      completedTasks: 11,
      totalTasks: 20,
      userCount: 74,
      note: 21,
      view: 60,
      time: '4h 59m',
      logo: 'ri-star-smile-line',
      color: 'primary',
      courseTitle: 'The Science of Critical Thinking',
      desc: 'Learn how to improve your arguments & make better decisions',
      tags: 'Psychology',
      rating: 4.4,
      ratingCount: 64,
    },
    {
      id: 8,
      user: 'Aviva Penvarden',
      tutorImg: tutorImg2,
      image: avatar1,
      completedTasks: 6,
      totalTasks: 25,
      userCount: 44,
      note: 28,
      view: 13,
      time: '2h 09m',
      logo: 'ri-palette-line',
      color: 'warning',
      courseTitle: 'The Complete Figma UI/UX Course',
      desc: 'Learn how to design a beautiful & engaging mobile app with Figma',
      tags: 'UI/UX',
      rating: 4.3,
      ratingCount: 34,
    },
    {
      id: 9,
      user: 'Reggi Tuddenham',
      tutorImg: tutorImg3,
      image: avatar8,
      completedTasks: 67,
      totalTasks: 100,
      userCount: 95,
      note: 34,
      view: 26,
      time: '22h 21m',
      logo: 'ri-star-smile-line',
      color: 'primary',
      courseTitle: 'Advanced Problem Solving Techniques',
      desc: 'Learn how to solve problems like a professional with this immersive course',
      tags: 'Psychology',
      rating: 4.2,
      ratingCount: 85,
    },
    {
      id: 10,
      user: 'Aluin Leveritt',
      image: avatar1,
      completedTasks: 49,
      totalTasks: 50,
      tutorImg: tutorImg4,
      userCount: 98,
      note: 51,
      view: 37,
      time: '22h 22m',
      logo: 'ri-reactjs-line',
      color: 'info',
      courseTitle: 'Advanced React Native',
      desc: 'Learn how to build the world\'s most popular mobile OS with this immersive course',
      tags: 'Web',
      rating: 4.1,
      ratingCount: 88,
    },
    {
      id: 11,
      user: 'Ardys Deakin',
      image: avatar9,
      completedTasks: 87,
      totalTasks: 100,
      tutorImg: tutorImg5,
      userCount: 19,
      note: 40,
      view: 32,
      time: '15h 25m',
      logo: 'ri-reactjs-line',
      color: 'info',
      courseTitle: 'Building Web Applications with React',
      desc: 'Learn how to build modern web apps with React and Redux',
      tags: 'Web',
      rating: 4.0,
      ratingCount: 9,
    },
    {
      id: 12,
      user: 'Camel Scown',
      image: avatar1,
      tutorImg: tutorImg6,
      completedTasks: 22,
      totalTasks: 25,
      userCount: 26,
      note: 22,
      view: 77,
      time: '4h 33m',
      logo: 'ri-angularjs-line',
      color: 'error',
      courseTitle: 'Angular Routing and Navigation',
      desc: 'Learn how to build single page applications like a pro with this immersive course',
      tags: 'Web',
      rating: 3.9,
      ratingCount: 16,
    },
    {
      id: 13,
      user: 'Bertina Honnan',
      image: avatar15,
      tutorImg: tutorImg1,
      completedTasks: 11,
      totalTasks: 50,
      userCount: 78,
      note: 75,
      view: 87,
      time: '16h 38m',
      logo: 'ri-star-smile-line',
      color: 'primary',
      courseTitle: 'Creative Problem Solving',
      desc: 'Learn how to solve problems creatively and effectively with this immersive course',
      tags: 'Psychology',
      rating: 3.8,
      ratingCount: 68,
    },
    {
      id: 14,
      user: 'Hillyer Wooster',
      image: avatar2,
      tutorImg: tutorImg2,
      completedTasks: 11,
      totalTasks: 25,
      userCount: 92,
      note: 39,
      view: 60,
      time: '22h 43m',
      logo: 'ri-angularjs-line',
      color: 'error',
      courseTitle: 'Building Web Applications with Angular',
      desc: 'Learn how to build modern web apps with Angular and TypeScript',
      tags: 'Web',
      rating: 3.7,
      ratingCount: 82,
    },
    {
      id: 15,
      user: 'Emerson Hance',
      image: avatar12,
      tutorImg: tutorImg3,
      completedTasks: 4,
      totalTasks: 5,
      userCount: 14,
      note: 22,
      view: 51,
      time: '2h 29m',
      logo: 'ri-angularjs-line',
      color: 'error',
      courseTitle: 'Advanced Angular',
      desc: 'Learn how to build modern web apps with Angular and TypeScript',
      tags: 'Web',
      rating: 3.6,
      ratingCount: 12,
    },
    {
      id: 16,
      user: 'Ginger Cruft',
      image: avatar1,
      tutorImg: tutorImg4,
      completedTasks: 22,
      totalTasks: 25,
      userCount: 20,
      note: 12,
      view: 95,
      time: '20h 10m',
      logo: 'ri-reactjs-line',
      color: 'info',
      courseTitle: 'Testing React with Jest and Enzyme',
      desc: 'Learn how to build modern web apps with React and Redux',
      tags: 'Web',
      rating: 3.5,
      ratingCount: 10,
    },
    {
      id: 17,
      user: 'Rollie Parsons',
      image: avatar13,
      tutorImg: tutorImg5,
      completedTasks: 11,
      totalTasks: 50,
      userCount: 29,
      note: 20,
      view: 98,
      time: '16h 15m',
      logo: 'ri-palette-line',
      color: 'wa',
      courseTitle: 'Typography Theory',
      desc: 'Learn how to build modern web apps with React and Redux',
      tags: 'Design',
      rating: 3.4,
      ratingCount: 19,
    },
    {
      id: 18,
      user: 'Randy Foister',
      image: avatar1,
      completedTasks: 23,
      tutorImg: tutorImg6,
      totalTasks: 100,
      userCount: 20,
      note: 16,
      view: 77,
      time: '4h 31m',
      logo: 'ri-angularjs-line',
      color: 'error',
      courseTitle: 'Angular Testing',
      desc: 'Learn how to build modern web apps with Angular and TypeScript',
      tags: 'Web',
      rating: 4.3,
      ratingCount: 10,
    },
    {
      id: 19,
      user: 'Ashleigh Bartkowiak',
      image: avatar8,
      completedTasks: 17,
      tutorImg: tutorImg1,
      totalTasks: 50,
      userCount: 28,
      note: 91,
      view: 31,
      time: '1h 52m',
      logo: 'ri-reactjs-line',
      color: 'info',
      courseTitle: 'React for Professional',
      desc: 'Learn how to build modern web apps with React and Redux',
      tags: 'Web',
      rating: 4.2,
      ratingCount: 18,
    },
    {
      id: 20,
      user: 'Bernarr Markie',
      image: avatar12,
      tutorImg: tutorImg2,
      completedTasks: 1,
      totalTasks: 10,
      userCount: 11,
      note: 33,
      view: 53,
      time: '16h 24m',
      logo: 'ri-pencil-line',
      color: 'success',
      courseTitle: 'The Ultimate Drawing Course',
      desc: 'Learn how to draw like a professional with this immersive course',
      tags: 'Art',
      rating: 4.1,
      ratingCount: 9,
    },
    {
      id: 21,
      user: 'Merrilee Whitnell',
      image: avatar2,
      completedTasks: 91,
      totalTasks: 100,
      tutorImg: tutorImg3,
      userCount: 11,
      note: 17,
      view: 74,
      time: '5h 57m',
      logo: 'ri-angularjs-line',
      color: 'error',
      courseTitle: 'Basics of Angular',
      desc: 'Introductory course for Angular and framework basics with TypeScript',
      tags: 'Web',
      rating: 4.0,
      ratingCount: 7,
    },
    {
      id: 22,
      user: 'Thekla Dineges',
      image: avatar1,
      tutorImg: tutorImg4,
      completedTasks: 49,
      totalTasks: 50,
      userCount: 28,
      note: 30,
      view: 54,
      time: '4h 40m',
      logo: 'ri-pencil-line',
      color: 'success',
      courseTitle: 'Introduction to Digital Painting',
      desc: 'Learn how to draw like a professional with this immersive course',
      tags: 'Art',
      rating: 3.9,
      ratingCount: 18,
    },
    {
      id: 23,
      user: 'Freda Garham',
      image: avatar5,
      tutorImg: tutorImg5,
      completedTasks: 81,
      totalTasks: 100,
      userCount: 79,
      note: 46,
      view: 27,
      time: '8h 44m',
      logo: 'ri-star-smile-line',
      color: 'primary',
      courseTitle: 'The Science of Everyday Thinking',
      desc: 'Learn how to think better, argue better, and choose better',
      tags: 'Psychology',
      rating: 3.8,
      ratingCount: 69,
    },
    {
      id: 24,
      user: 'Leyla Bourley',
      image: avatar13,
      completedTasks: 6,
      tutorImg: tutorImg6,
      totalTasks: 25,
      userCount: 28,
      note: 11,
      view: 77,
      time: '22h 36m',
      logo: 'ri-pencil-line',
      color: 'success',
      courseTitle: 'Color Theory',
      desc: 'Learn how to use color like a professional with this immersive course',
      tags: 'Design',
      rating: 3.7,
      ratingCount: 18,
    },
    {
      id: 25,
      user: 'Nevsa Lawey',
      image: avatar6,
      completedTasks: 13,
      totalTasks: 100,
      tutorImg: tutorImg1,
      userCount: 93,
      note: 73,
      view: 67,
      time: '19h 21m',
      logo: 'ri-palette-line',
      color: 'warning',
      courseTitle: 'The Complete Figma Course',
      desc: 'Learn how to design a beautiful & engaging mobile app with Figma',
      tags: 'UI/UX',
      rating: 3.6,
      ratingCount: 83,
    },
  ],
  courseDetails: {
    title: 'UI/UX Basic Fundamentals',
    about: 'Learn web design in 1 hour with 25+ simple-to-use rules and guidelines — tons of amazing web design resources included!',
    instructor: 'Devonne Wallbridge',
    instructorAvatar: avatar1,
    instructorPosition: 'Web Developer, Designer, and Teacher',
    skillLevel: 'All Level',
    totalStudents: 38815,
    language: 'English',
    isCaptions: true,
    length: '1.5 total hours',
    totalLectures: 19,
    description: `
        <p class="text-body-1">
          The material of this course is also covered in my other course about web design and development with HTML5 & CSS3. Scroll to the bottom of this page to check out that course, too! If you're already taking my other course, you already have all it takes to start designing beautiful websites today!
        </p>
      
        <p class="text-body-1">
          "Best web design course: If you're interested in web design, but want more than just a "how to use WordPress" course, I highly recommend this one." — Florian Giusti
        </p>
      
        <p class="text-body-1">
          "Very helpful to us left-brained people: I am familiar with HTML, CSS, jQuery, and Twitter Bootstrap, but I needed instruction in web design. This course gave me practical, impactful techniques for making websites more beautiful and engaging." — Susan Darlene Cain
        </p>`,
    content: [
      {
        title: 'Course Content',
        status: '2/5',
        time: '4.4 min',
        id: 'section1',
        topics: [
          { title: 'Welcome to this course', time: '2.4 min', isCompleted: true },
          { title: 'Watch before you start', time: '4.8 min', isCompleted: true },
          { title: 'Basic Design theory', time: '5.9 min', isCompleted: false },
          { title: 'Basic Fundamentals', time: '3.6 min', isCompleted: false },
          { title: 'What is ui/ux', time: '10.6 min', isCompleted: false },
        ],
      },
      {
        title: 'Web design for Developers',
        status: '0/4',
        time: '4.8 min',
        id: 'section2',
        topics: [
          { title: 'How to use Pages in Figma', time: '8:31 min', isCompleted: false },
          { title: 'What is Lo Fi Wireframe', time: '2 min', isCompleted: false },
          { title: 'How to use color in Figma', time: '5.9 min', isCompleted: false },
          { title: 'Frames vs Groups in Figma', time: '3.6 min', isCompleted: false },
        ],
      },
      {
        title: 'Build Beautiful Websites!',
        status: '0/4',
        time: '4.4 min',
        id: 'section3',
        topics: [
          { title: 'Section & Div Block', time: '3:53 min', isCompleted: false },
          { title: 'Read-Only Version of Chat App', time: '2:03 min', isCompleted: false },
          { title: 'Webflow Autosave', time: '8 min', isCompleted: false },
          { title: 'Canvas Settings', time: '3 min', isCompleted: false },
          { title: 'HTML Tags', time: '10 min', isCompleted: false },
          { title: 'Footer (Chat App)', time: '9:10 min', isCompleted: false },
        ],
      },
      {
        title: 'Final Project',
        status: '0/3',
        time: '4.4 min',
        id: 'section4',
        topics: [
          { title: 'Responsive Blog Site', time: '10:00 min', isCompleted: false },
          { title: 'Responsive Portfolio', time: '13:00 min', isCompleted: false },
          { title: 'Basic Design theory', time: '15 min', isCompleted: false },
        ],
      },
    ],
  },
}