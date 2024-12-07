export const properties = [
    {
      id: 1,
      title: 'Luxury Modern Villa',
      price: 1250000,
      location: 'Avondale, Harare',
      description: 'This stunning modern villa offers the perfect blend of luxury and comfort. Featuring premium finishes, smart home technology, and breathtaking views.',
      images: ['/home.jpg', '/int.jpeg', '/int2.png'],
      beds: 4,
      baths: 3,
      sqft: 2500,
      type: 'villa',
      features: [
        'Smart Home Technology',
        'Infinity Pool',
        'Home Theater',
        'Wine Cellar',
        'Gourmet Kitchen',
        'Private Garden',
      ],
        details: {
        yearBuilt: 2022,
        lotSize: '0.5 acres',
        garage: '2 cars',
      }
    },
    {
      id: 2,
      title: 'Cozy Family House',
      price: 850000,
      location: 'Borrowdale West, Harare',
      description: 'Perfect family home with spacious living areas and a beautiful garden for outdoor entertainment.',
      images: ['/home3.jpg', '/int3.webp', '/int4.jpg'],
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      type: 'house',
      features: [
        'Garden Patio',
        'Modern Kitchen',
        'Solar System',
        'Swimming Pool',
        'Study Room',
        'Staff Quarters'
      ],
      details: {
        yearBuilt: 2019,
        lotSize: '800 sqm',
        garage: '2 cars'
      }
    },
    {
      id: 3,
      title: 'Contemporary Home',
      price: 920000,
      location: 'Mount Pleasant, Harare',
      description: 'Architecturally designed home featuring clean lines and abundant natural light.',
      images: ['/home4.jpg', '/int5.webp', '/int6.jpg'],
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: 'home',
      features: [
        'High Ceilings',
        'Designer Kitchen',
        'Entertainment Area',
        'Solar Backup',
        'Borehole',
        'Electric Gate'
      ],
      details: {
        yearBuilt: 2023,
        lotSize: '1000 sqm',
        garage: '3 cars'
      }
    },
    {
      id: 4,
      title: 'Urban Penthouse',
      price: 695000,
      location: 'Newlands, Harare',
      description: 'Luxurious top-floor apartment with panoramic city views and modern finishes.',
      images: ['/home5.jpg', '/int7.jpg', '/int8.jpg'],
      beds: 2,
      baths: 2,
      sqft: 1500,
      type: 'apartment',
      features: [
        'Panoramic Views',
        'European Kitchen',
        'Private Elevator',
        'Backup Power',
        'Air Conditioning',
        'Smart Security'
      ],
      details: {
        yearBuilt: 2021,
        lotSize: 'N/A',
        garage: '2 cars'
      }
    },
    {
      id: 5,
      title: 'Executive Apartment',
      price: 550000,
      location: 'Gunhill, Harare',
      description: 'Modern apartment in a secure complex with excellent amenities and city views.',
      images: ['/home6.jpg', '/int9.jpg', '/int10.jpg'],
      beds: 3,
      baths: 2,
      sqft: 1600,
      type: 'apartment',
      features: [
        'Built-in Wardrobes',
        'Modern Finishes',
        'Gym Access',
        'Swimming Pool',
        '24/7 Security',
        'Visitor Parking'
      ],
      details: {
        yearBuilt: 2020,
        lotSize: 'N/A',
        garage: '1 car'
      }
    },
    {
      id: 6,
      title: 'Garden Apartment',
      price: 480000,
      location: 'Chisipite, Harare',
      description: 'Ground floor apartment with private garden and excellent security.',
      images: ['/home7.jpg', '/int11.jpg', '/int12.jpg'],
      beds: 2,
      baths: 1.5,
      sqft: 1100,
      type: 'apartment',
      features: [
        'Private Garden',
        'Open Plan Kitchen',
        'Fiber Internet',
        'Electric Fence',
        'Water Storage',
        'Carport'
      ],
      details: {
        yearBuilt: 2018,
        lotSize: 'N/A',
        garage: '1 car'
      }
    },
    {
      id: 7,
      title: 'Luxury Townhouse',
      price: 780000,
      location: 'Glen Lorne, Harare',
      description: 'Modern townhouse in an upmarket complex with excellent security and amenities.',
      images: ['/home8.jpg', '/int13.jpg', '/int14.jpg'],
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      type: 'apartment',
      features: [
        'Double Story',
        'Fitted Kitchen',
        'Communal Pool',
        'Tennis Court',
        'Clubhouse Access',
        'Backup Generator'
      ],
      details: {
        yearBuilt: 2022,
        lotSize: '400 sqm',
        garage: '2 cars'
      }
    }
];
  
export const featuredProperties = [properties[0], properties[1], properties[2]];