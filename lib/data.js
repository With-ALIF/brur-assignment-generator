const departmentGroups = [
  {
    label: "Faculty Of Arts",
    options: [
      "Department Of Bangla",
      "Department Of English",
      "History and Archaeology"
    ]
  },
  {
    label: "Faculty Of Life And Earth Science",
    options: [
      "Department of Geography and Environmental Science",
      "Department of Disaster Science and Management"
    ]
  },
  {
    label: "Faculty Of Science",
    options: [
      "Department of Mathematics",
      "Department of Statistics",
      "Department of Physics",
      "Department of Chemistry"
    ]
  },
  {
    label: "Faculty Of Engineering And Technology",
    options: [
      "Department of Computer Science and Engineering",
      "Department of Electrical and Electronic Engineering"
    ]
  },
  {
    label: "Faculty Of Social Sciences",
    options: [
      "Department of Economics",
      "Department of Political Science",
      "Department of Sociology",
      "Department of Gender and Development Studies",
      "Department of Mass Communication and Journalism",
      "Department of Public Administration"
    ]
  },
  {
    label: "Faculty Of Business Studies",
    options: [
      "Department of Management Studies",
      "Department of Marketing",
      "Department of Accounting and Information Systems",
      "Department of Finance and Banking",
      "Department of Management Information Systems(MIS)"
    ]
  }
];

const teacherData = {
  "Department Of Bangla": [
    "Dr. Sarifa Salowa Dina",
    "Prof. Dr. Syedul Hoque",
    "Dr. Parimal Chandra Barman",
    "Prof. Dr. Abu Sala Mohammad Wadud Rahman",
    "Dr. Shafiqur Rahman",
    "Dr. Nital Kumar Ghosh",
    "Most. Sirajum Munira",
    "Md. Khyrul Islam",
    "Md. Golam Rabbani",
    "Monir Hossain"
  ],
  "Department Of English": [
    "Md. Ali Rayhan Sarker",
    "Asif Al Matin",
    "Dr. Mohsina Ahsan",
    "Zeenat Sharmin",
    "Kafia Yasmin Anwa",
    "Moutushi Roy",
    "Fahmida Rahman",
    "Md. Musfier Jelane",
    "Emrana Bari",
    "Farhana Mahzabin"
  ],
  "History and Archaeology": [
    "Md. Golam Rabbani",
    "Ara Tanzia",
    "Dr. Md. Moniruzzaman",
    "Md. Yousuf",
    "Dr. Sohag Ali",
    "Jesmin Nahar Jhumur",
    "Md. Rabiul Islam",
    "Sima Akter"
  ],
  "Department of Economics": [
    "Prof. Dr. Md. Morshed Hossain",
    "Dr. Jani Parvin",
    "Khandokar Jahangir Alam",
    "Md. Shafiqul Islam",
    "Habibur Rahman",
    "Md. Belal Uddin",
    "Md. Moinuddin Hossain",
    "Kazi Newaz Mostafa",
    "Mintu Barua",
    "Shafiquddin Khaled"
  ],
  "Department of Political Science": [
    "Md. Shariful Islam",
    "Dr. Md. Tanzilul Islam",
    "Md. Sayedur Rahman",
    "Arefa Sultana",
    "Md. Kazi Rezaun Hossain",
    "Mst. Rojia Sultana",
    "Md. Shiful Islam",
    "Nazma Akter",
    "Mst. Mumnun Akter",
    "Md. Zamlur Rahman"
  ],
  "Department of Sociology": [
    "Mirza Aminun Nesa",
    "Md. Golam Rabbani Sarker",
    "Muhammad Ilias",
    "Muhammad Anwar Hossain",
    "Shammi Islam",
    "Ram Prashad Barman",
    "A B M Nurullah",
    "Yasmin Sultana",
    "Sumaya Tahsin Hamida",
    "Dipika Biswas"
  ],
  "Department of Gender and Development Studies": [
    "Md. Humayun Kabir",
    "Dr. Md. Delwar Hossain",
    "Mir Tamanna Siddika",
    "Marufa Rahman",
    "Zarin Yesmin Chisty",
    "Kuntala Chowdhury",
    "Khadiza Akter",
    "Taha Hossain",
    "Lubna Akter",
    "Khan Tahida Tasnim Mou"
  ],
  "Department of Mass Communication and Journalism": [
    "Dr. Md. Nazrul Islam",
    "Tabiur Rahman Prodhan",
    "Thasnim Humida",
    "Niamun Nahar",
    "Md. Mahamudul Haque",
    "Md. Sarwar Ahmad",
    "Md. Rahmatullah",
    "Beauty Mondal",
    "Sahibur Rahman"
  ],
  "Department of Public Administration": [
    "Jubaer Ibna Taher",
    "Md. Asaduzzaman Mondol",
    "Md. Sabbir Ahmed Chowdhury",
    "Samantha Tamrin",
    "Md. Mujahidul Islam",
    "Mashraky Mustary",
    "Niaz Mahdum",
    "Saiful Islam",
    "Afzal Hossain Sakil",
    "A. M. M. Mubassher Shah"
  ],
  "Department of Geography and Environmental Science": [
    "Dr. Mst. Shifat Rumana",
    "Md. Atiur Rahman",
    "Subarna Chandra Sarker",
    "Md. Mostafizur Rahman",
    "Md. Zakir Rahman",
    "Syed Anowerul Azim",
    "Bidut Kumar Ghosh",
    "Mohua Sobnam",
    "Md. Shamim Hossain",
    "Md. Tanzirul Islam"
  ],
  "Department of Disaster Science and Management": [
    "Dr. Abu Reza Md. Towfiqul Islam",
    "Dr. Md. Emdadul Haque",
    "Dr. Md. Abdur Rakib",
    "Dr. Shakibul Islam",
    "Dr. A. T. M. Zinnatul Basser",
    "Md. Abdullah-Al-Mahbub",
    "Md. Sanjid Islam Khan",
    "Md. Aminul Islam",
    "Mehnaz Abbas Badhan",
    "Md. Khalid Hassan Real"
  ],
  "Department of Mathematics": [
    "Prof. Dr. R. M. Hafizur Rahman",
    "Dr. Md. Tajul Islam",
    "Kamalesh Chandra Roy",
    "Dr. Md. Ruhul Amin",
    "Md. Hannan Miah",
    "A. K. M. Kazi Sazzad Hossain",
    "Md. Moshur Rahman",
    "Md. Ismail Hossain",
    "Mst. Jesmin Nahar",
    "Mst. Ayin Akhtar",
    "Md. Akher Chowdhury"
  ],
  "Department of Statistics": [
    "Dr. Md. Shahjaman",
    "Dr. Md. Roshidul Islam",
    "Md. Siraj-Ud-Doulah",
    "Dr. Md. Siddikur Rahman",
    "Charls Darwin",
    "Dr. Md. Bipul Hossen",
    "Sukanta Das",
    "Atul Chandra Singha",
    "Farzana Zannat Toshi"
  ],
  "Department of Physics": [
    "Dr. Md. Gaji Mazharul Anowar",
    "Dr. Md. Al-Helal",
    "Dr. Md. Kamruzzaman",
    "Dr. Bakul Kumar Chakravorti",
    "Md. Nurul Huda Liton",
    "Mst. Ismita Tasnim",
    "Md. Abu Sayed",
    "Tania Nusrat",
    "Al Rafat",
    "Maruf Md. Rabbani Paramanik",
    "Sunzida Parvin",
    "Shah Azharul Islam"
  ],
  "Department of Chemistry": [
    "Dr. Bijan Mohon Chaki",
    "H. M. Tariqul Islam",
    "Tania Tofaz",
    "Dr. Md. Abdul Latif",
    "Dr. Md. Harun-Al-Rashid",
    "Md. Nuruzzaman Khan",
    "Dr. Abinash Chandro Sarker",
    "Dr. Md. Jakir Hossain",
    "Dr. Md. Saddam Hossain",
    "Mostafa Kaiyum Sharafat",
    "Jasim Uddin",
    "Rabiul Islam",
    "Ataur Rahman"
  ],
  "Department of Management Studies": [
    "Dr. Md. Motiur Rahman",
    "Mohammad Raful Azam Khan",
    "Dr. Mohammad Azizur Rahman",
    "Md. Masud Rana",
    "Md. Sadrul Islam Sarker",
    "Ayesha Siddiqa",
    "Mst. Nishrat Zaman",
    "Dr. Md. Faisal-E-Alam",
    "Md. Nazmus Sakib"
  ],
  "Department of Marketing": [
    "Md. Ferdush Rahman",
    "Dr. Md. Zahid Hossain",
    "Dr. Md. Shahzalal",
    "Sheikh Majedul Huq",
    "Md. Nurrobi Islam",
    "Mst. Shuly Aktar",
    "Md. Masud-Ul-Hasan",
    "Md. Rakibul Hafiz Khan Rakib",
    "Mst. Sadia Afreen"
  ],
  "Department of Accounting and Information Systems": [
    "Dr. Appel Mahmud",
    "Md. Amir Sharif",
    "Md. Shahinoor Rahman",
    "Omar Faruque",
    "Md. Ashanuzzaman",
    "Mohammad Ashrafuzzaman",
    "Md. Rasel Uddin",
    "Fahimul Kader Siddique",
    "Sharifa Akter Nipa",
    "Md. Sobhan Ali"
  ],
  "Department of Finance and Banking": [
    "Dr. Md. Nur Alam Siddik",
    "Khairul Kabir Sumon",
    "Md. Shakhawat Hossin",
    "Md. Nurul Kabir Biplob",
    "Dr. Md. Ataur Rahman",
    "Dr. Md. Sazzad Hossain Patwary",
    "Dr. Md. Sazib Miyan",
    "Md. Touhidul Islam",
    "Nusrat Jahan Sadia",
    "Tanvir Hasan Anik"
  ],
  "Department of Management Information Systems(MIS)": [
    "S. M. Ashraful Alam",
    "Samsul Alam",
    "Somaya Tabassum",
    "Mohammad Rakibul Islam Bhuiyan",
    "Khadija Sharmin",
    "Afsana Mimi"
  ],
  "Department of Computer Science and Engineering": [
    "Prof. Dr. Abu Kalam Md. Farid Uddin",
    "Dr. Md. Mizanur Rahman",
    "Dr. Iles Pramanik",
    "Dr. Prodip Kumar Sarker",
    "Md. Zasim Uddin",
    "Md. Shamsuzzaman",
    "Md. Abul Kalam Azad",
    "Sanjay Kumar Saha",
    "Marjia Sultana",
    "Md. Hasan Tarek",
    "Md. Faruk Hosen"
  ],
  "Department of Electrical and Electronic Engineering": [
    "Dr. Sumon Kumar Debnath",
    "Dr. Md. Ferdous Rahman",
    "Dr. Md. Ahsan Habib",
    "Joarder Jafor Sadique",
    "Dr. Md. Hasan Ali",
    "Md. Sharif Uddin",
    "A. K. M. Mahmudul Haque",
    "Md. Monirul Islam",
    "Ifat Ara Badhan",
    "Md. Abul Munjer",
    "Bipanko Kumar Mondal"
  ]
};