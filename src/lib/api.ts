const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; 
// 👆 You can set NEXT_PUBLIC_API_URL in .env

// Generic GET request
export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store", // Always fetch fresh data (SSR)
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// Example: Fetch events
export async function getEvents() {
  return apiGet<{ id: number; title: string; date: string }[]>("/api/events");
}

export async function getEvent(id: number) {
  return apiGet<{ id: number; title: string; date: string; description: string }>(
    `/api/events/${id}`
  );
}

// pages/api/states/[stateCode].js - Example Next.js API route
// Or equivalent backend endpoint

export default async function handler(req, res) {
  const { stateCode } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mock data - replace with your actual database queries
    const stateDatabase = {
      'CA': {
        capital: 'Sacramento',
        population: '39.5 million',
        eventCount: 245,
        description: 'Discover amazing events across the Golden State',
        events: [
          {
            title: 'California Music Festival',
            date: 'Apr 15, 2024',
            location: 'Los Angeles',
            price: '$45.00'
          },
          {
            title: 'Tech Innovation Summit',
            date: 'Apr 20, 2024',
            location: 'San Francisco',
            price: '$120.00'
          }
        ]
      },
      'NY': {
        capital: 'Albany',
        population: '19.8 million',
        eventCount: 189,
        description: 'Experience the vibrant event scene in the Empire State',
        events: [
          {
            title: 'Broadway Spring Showcase',
            date: 'May 5, 2024',
            location: 'New York City',
            price: '$85.00'
          }
        ]
      },
      'TX': {
        capital: 'Austin',
        population: '30.0 million',
        eventCount: 167,
        description: 'Everything is bigger in Texas, including our events!',
        events: [
          {
            title: 'South by Southwest',
            date: 'Mar 10, 2024',
            location: 'Austin',
            price: '$299.00'
          }
        ]
      }
      // Add more states as needed
    };

    const stateData = stateDatabase[stateCode.toUpperCase()];

    if (!stateData) {
      // Return default data for states not in database
      return res.status(200).json({
        capital: 'Information not available',
        population: 'Information not available',
        eventCount: 0,
        description: `Explore events in this state`,
        events: []
      });
    }

    // Simulate API delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(200).json(stateData);

  } catch (error) {
    console.error('Error fetching state data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Alternative Express.js route example:
/*
app.get('/api/states/:stateCode', async (req, res) => {
  const { stateCode } = req.params;
  
  try {
    // Your database query logic here
    const stateData = await db.states.findOne({ code: stateCode.toUpperCase() });
    const events = await db.events.find({ state: stateCode.toUpperCase() });
    
    res.json({
      capital: stateData.capital,
      population: stateData.population,
      eventCount: events.length,
      description: stateData.description,
      events: events.slice(0, 5) // Limit to 5 recent events
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch state data' });
  }
});
*/