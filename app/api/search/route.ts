/**
 * @description Search API endpoint for Galaxy Community
 * Supports searching communities/constellations by name or interest
 */

import { NextRequest, NextResponse } from 'next/server';

// Mock data representing available communities
// In production, this would come from a database
const MOCK_COMMUNITIES = [
  {
    id: 'urban-oasis',
    name: 'Urban Oasis',
    description: 'Rooftop Gardening',
    interests: ['gardening', 'urban', 'plants', 'sustainability', 'green'],
    imageUrl: '/planets/urban-oasis.png',
    members: 342,
  },
  {
    id: 'midnight-echo',
    name: 'Midnight Echo',
    description: 'Night Coding',
    interests: ['coding', 'programming', 'development', 'tech', 'night'],
    imageUrl: '/planets/midnight-echo.png',
    members: 567,
  },
  {
    id: 'analog-soul',
    name: 'Analog Soul',
    description: 'Film Photography',
    interests: ['photography', 'film', 'analog', 'art', 'camera'],
    imageUrl: '/planets/analog-soul.png',
    members: 234,
  },
  {
    id: 'nomad-pulse',
    name: 'Nomad Pulse',
    description: 'Digital Nomad',
    interests: ['travel', 'remote work', 'nomad', 'adventure', 'digital'],
    imageUrl: '/planets/nomad-pulse.png',
    members: 456,
  },
  {
    id: 'kindness-core',
    name: 'Kindness Core',
    description: 'Neighborhood Help',
    interests: ['community', 'help', 'kindness', 'volunteering', 'neighborhood'],
    imageUrl: '/planets/kindness-core.png',
    members: 789,
  },
  {
    id: 'neon-valley',
    name: 'Neon Valley',
    description: 'Cyberpunk Art',
    interests: ['art', 'cyberpunk', 'digital art', 'neon', 'design'],
    imageUrl: '/planets/neon-valley.png',
    members: 423,
  },
  {
    id: 'silent-peak',
    name: 'Silent Peak',
    description: 'Zen Meditation',
    interests: ['meditation', 'zen', 'mindfulness', 'peace', 'wellness'],
    imageUrl: '/planets/silent-peak.png',
    members: 298,
  },
  {
    id: 'cloud-seven',
    name: 'Cloud Seven',
    description: 'Dream Journaling',
    interests: ['journaling', 'dreams', 'writing', 'creativity', 'self-reflection'],
    imageUrl: '/planets/cloud-seven.png',
    members: 512,
  },
  {
    id: 'bicycle-riders',
    name: 'Bicycle Riders',
    description: 'Cycling & Adventure',
    interests: ['bicycle', 'cycling', 'sports', 'outdoor', 'fitness'],
    imageUrl: '/planets/bicycle-riders.png',
    members: 621,
  },
  {
    id: 'book-worms',
    name: 'Book Worms',
    description: 'Reading & Literature',
    interests: ['books', 'reading', 'literature', 'stories', 'learning'],
    imageUrl: '/planets/book-worms.png',
    members: 834,
  },
  {
    id: 'music-makers',
    name: 'Music Makers',
    description: 'Music Creation & Production',
    interests: ['music', 'production', 'instruments', 'audio', 'creativity'],
    imageUrl: '/planets/music-makers.png',
    members: 445,
  },
  {
    id: 'game-forge',
    name: 'Game Forge',
    description: 'Game Development',
    interests: ['games', 'gamedev', 'development', 'programming', 'design'],
    imageUrl: '/planets/game-forge.png',
    members: 723,
  },
];

// Type definitions for the response
interface SearchResult {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

/**
 * GET /api/search
 * Searches communities based on query parameter
 * @param request - NextRequest containing search query
 * @returns JSON response with matched communities
 */
export async function GET(request: NextRequest) {
  try {
    // Extract query parameter from URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    // Validate query parameter
    if (!query || query.trim() === '') {
      return NextResponse.json(
        {
          error: 'Query parameter "q" is required and cannot be empty',
          message: 'Please provide a search term using the "q" query parameter',
        },
        { status: 400 }
      );
    }

    // Normalize query for case-insensitive search
    const normalizedQuery = query.toLowerCase().trim();

    // Perform search against mock data
    const matchedCommunities = MOCK_COMMUNITIES.filter((community) => {
      // Search in name (exact and partial matches)
      const nameMatch = community.name.toLowerCase().includes(normalizedQuery);

      // Search in description
      const descriptionMatch = community.description.toLowerCase().includes(normalizedQuery);

      // Search in interests/tags
      const interestMatch = community.interests.some((interest) =>
        interest.toLowerCase().includes(normalizedQuery)
      );

      // Return true if any field matches
      return nameMatch || descriptionMatch || interestMatch;
    });

    // Sort results by relevance (name matches first, then description, then interests)
    const sortedResults = matchedCommunities.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(normalizedQuery);
      const bNameMatch = b.name.toLowerCase().includes(normalizedQuery);

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      // If both match or both don't match in name, sort by member count
      return b.members - a.members;
    });

    // Map to response format (exclude internal fields like interests and members)
    const results: SearchResult[] = sortedResults.map((community) => ({
      id: community.id,
      name: community.name,
      description: community.description,
      imageUrl: community.imageUrl,
    }));

    // Construct response
    const response: SearchResponse = {
      results,
      total: results.length,
      query: query.trim(),
    };

    // Return successful response
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Search API Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your search',
      },
      { status: 500 }
    );
  }
}
