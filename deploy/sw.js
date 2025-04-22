// Service Worker for TopList Orlando
const CACHE_NAME = 'toplist-orlando-v1';

// List of assets to cache for offline access
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/logo.png',
  // Add other essential assets here as needed
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Network first strategy for dynamic content like API calls
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response for caching
          const responseClone = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
            
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache first strategy for static assets
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response for caching
            const responseClone = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
              
            return response;
          })
          .catch((error) => {
            // If offline and asset not in cache, show fallback
            console.log('Service Worker: Fetch failed; returning offline fallback', error);
            return caches.match('/offline.html');
          });
      })
  );
});

// Background sync for forms submitted while offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Function to handle background syncing of forms
async function syncForms() {
  try {
    // Get all pending form submissions from IndexedDB
    const db = await openDB();
    const pendingForms = await db.getAll('pending-forms');
    
    // Process each pending form
    for (const form of pendingForms) {
      try {
        // Attempt to resubmit the form
        const response = await fetch(form.url, {
          method: form.method,
          headers: form.headers,
          body: form.formData
        });
        
        if (response.ok) {
          // If successful, remove from pending
          await db.delete('pending-forms', form.id);
        }
      } catch (error) {
        console.error('Failed to sync form:', error);
      }
    }
  } catch (error) {
    console.error('Error in syncForms:', error);
  }
}

// Simple IndexedDB wrapper for storing pending form submissions
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('toplist-forms-db', 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('pending-forms', { keyPath: 'id', autoIncrement: true });
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
} 