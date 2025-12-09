import { supabase } from './supabase';

async function createAdminUser() {
  const adminEmail = 'BigPezza@evasonbuilding.com';
  const adminPassword = 'TaylorEzmaeAmelia';

  const { data: existingUser } = await supabase.auth.admin.listUsers();
  const userExists = existingUser?.users?.some(u => u.email === adminEmail);

  if (userExists) {
    console.log('Admin user already exists');
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: adminEmail,
    password: adminPassword,
    options: {
      emailRedirectTo: undefined,
    }
  });

  if (error) {
    console.error('Error creating admin user:', error);
  } else {
    console.log('Admin user created successfully');
  }
}

export async function initializeDatabase() {
  await createAdminUser();
  const { data: existingProjects } = await supabase
    .from('projects')
    .select('id')
    .limit(1);

  if (existingProjects && existingProjects.length > 0) {
    console.log('Database already initialized');
    return;
  }

  const sampleProjects = [
    {
      title: 'The Hartley Kitchen Extension',
      description: 'A stunning single-storey rear extension with open-plan kitchen design featuring floor-to-ceiling bi-fold doors and bespoke kitchen island.',
      category: 'Extension',
      location: 'Hertfordshire',
      image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      challenge: 'The clients wanted to transform their dated, cramped kitchen into a modern, open-plan space that connected seamlessly to their garden. The existing layout was poorly configured, and structural limitations required careful planning.',
      solution: 'Evason Building designed and built a stunning single-storey extension with floor-to-ceiling bi-fold doors, exposed brick feature walls, and a bespoke kitchen island. Structural steel work allowed for an open, airy layout, while underfloor heating and premium finishes ensured comfort and style.',
      result: 'A breathtaking transformation that added significant value to the property and created a space the family will enjoy for decades.',
      completed_date: '2024-09-15'
    },
    {
      title: 'The Bennington Full Renovation',
      description: 'Complete house renovation including structural alterations, two-storey side extension, full rewiring, new heating, and high-end finishes throughout.',
      category: 'Renovation',
      location: 'Buckinghamshire',
      image_url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      challenge: 'A 1960s property in need of complete modernisation. The clients wanted to reconfigure the ground floor, add an ensuite, upgrade all services, and refresh every room.',
      solution: 'Evason Building managed the entire project, including structural alterations to open up the ground floor, a two-storey side extension, full rewiring, new heating, and high-end finishes throughout. Our project management ensured minimal disruption and on-time delivery.',
      result: 'A contemporary family home that blends modern design with timeless quality. The clients were thrilled with the level of craftsmanship and attention to detail.',
      completed_date: '2024-06-20'
    },
    {
      title: 'Modern Loft Conversion',
      description: 'Two-bedroom loft conversion with ensuite bathroom, maximizing space with clever storage solutions and Velux windows.',
      category: 'Conversion',
      location: 'Bedfordshire',
      image_url: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: true,
      completed_date: '2024-08-10'
    },
    {
      title: 'Contemporary New Build',
      description: 'Four-bedroom detached new build with open-plan living, high-spec kitchen, and landscaped gardens.',
      category: 'New Build',
      location: 'Hertfordshire',
      image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: false,
      completed_date: '2024-05-30'
    },
    {
      title: 'Luxury Kitchen Remodel',
      description: 'High-end kitchen renovation with marble countertops, bespoke cabinetry, and integrated appliances.',
      category: 'Kitchen',
      location: 'Buckinghamshire',
      image_url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: false,
      completed_date: '2024-07-22'
    },
    {
      title: 'Period Property Restoration',
      description: 'Sympathetic restoration of Victorian terrace including structural repairs, damp treatment, and period features.',
      category: 'Renovation',
      location: 'Hertfordshire',
      image_url: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
      featured: false,
      completed_date: '2024-04-18'
    }
  ];

  const sampleTestimonials = [
    {
      client_name: 'Sarah & Tom Hartley',
      location: 'Hertfordshire',
      project_type: 'Kitchen Extension',
      quote: 'We couldn\'t be happier. The craftsmanship is outstanding, and the process was so much smoother than we expected.',
      rating: 5,
      featured: true
    },
    {
      client_name: 'James & Emma Bennington',
      location: 'Buckinghamshire',
      project_type: 'Full Renovation',
      quote: 'Evason took a tired, dated house and turned it into our dream home. Their professionalism and skill are second to none.',
      rating: 5,
      featured: true
    },
    {
      client_name: 'Michael P.',
      location: 'Bedfordshire',
      project_type: 'Extension & Renovation',
      quote: 'Exceptional quality and service from start to finish. We\'re recommending Evason to everyone we know.',
      rating: 5,
      featured: true
    },
    {
      client_name: 'Laura & David',
      location: 'Hertfordshire',
      project_type: 'Kitchen Extension',
      quote: 'The team was professional, punctual, and incredibly skilled. Our new kitchen is everything we hoped for.',
      rating: 5,
      featured: false
    },
    {
      client_name: 'Rachel S.',
      location: 'Buckinghamshire',
      project_type: 'Loft Conversion',
      quote: 'Transparent pricing, clear communication, and outstanding workmanship. We couldn\'t ask for more.',
      rating: 5,
      featured: false
    },
    {
      client_name: 'Simon & Jane',
      location: 'Oxfordshire',
      project_type: 'Full Home Renovation',
      quote: 'Evason Building turned our vision into reality. The finish is flawless, and the process was seamless.',
      rating: 5,
      featured: false
    },
    {
      client_name: 'Katie M.',
      location: 'Hertfordshire',
      project_type: 'Two-Storey Extension',
      quote: 'We were nervous about a big build, but Evason made it easy. They delivered on every promise.',
      rating: 5,
      featured: false
    },
    {
      client_name: 'Andrew & Sarah',
      location: 'Bedfordshire',
      project_type: 'New Build',
      quote: 'Fantastic attention to detail and a genuine commitment to getting things right. Highly recommended.',
      rating: 5,
      featured: false
    },
    {
      client_name: 'Mark T.',
      location: 'Buckinghamshire',
      project_type: 'Conversion & Structural Work',
      quote: 'From the first meeting to final handover, Evason were brilliant. Our home has been completely transformed.',
      rating: 5,
      featured: false
    },
    {
      client_name: 'Emma L.',
      location: 'Hertfordshire',
      project_type: 'Bathroom & Kitchen Renovation',
      quote: 'Professional, reliable, and skilled. Evason are the only builders we\'ll ever use.',
      rating: 5,
      featured: false
    }
  ];

  await supabase.from('projects').insert(sampleProjects);
  await supabase.from('testimonials').insert(sampleTestimonials);

  console.log('Database initialized with sample data');
}
