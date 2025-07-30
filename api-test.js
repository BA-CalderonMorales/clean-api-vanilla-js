// Simple test of @ba-calderonmorales/clean-api library
const { APIBase, APIError } = require('@ba-calderonmorales/clean-api');
const fetch = require('node-fetch');

// Create an APIBase instance for route management
const apiBase = new APIBase();

// Add routes using the clean-api library
apiBase.addRoute('getAllPosts', 'https://jsonplaceholder.typicode.com/posts');
apiBase.addRoute('getPost', 'https://jsonplaceholder.typicode.com/posts/:id');
apiBase.addRoute('createPost', 'https://jsonplaceholder.typicode.com/posts');
apiBase.addRoute('updatePost', 'https://jsonplaceholder.typicode.com/posts/:id');
apiBase.addRoute('deletePost', 'https://jsonplaceholder.typicode.com/posts/:id');

// Simple HTTP client using fetch
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new APIError(`HTTP ${response.status}`, { status: response.status, data });
        }
        
        return { data, status: response.status };
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError('Network error', { status: 0, data: error.message });
    }
}

// Test functions using the clean-api library for route management
async function getAllPosts() {
    return await makeRequest(apiBase.routes.getAllPosts);
}

async function getPost(id) {
    const url = apiBase.routes.getPost.replace(':id', id);
    return await makeRequest(url);
}

async function createPost(postData) {
    return await makeRequest(apiBase.routes.createPost, {
        method: 'POST',
        body: JSON.stringify(postData)
    });
}

async function updatePost(id, postData) {
    const url = apiBase.routes.updatePost.replace(':id', id);
    return await makeRequest(url, {
        method: 'PUT',
        body: JSON.stringify(postData)
    });
}

async function deletePost(id) {
    const url = apiBase.routes.deletePost.replace(':id', id);
    return await makeRequest(url, { method: 'DELETE' });
}

// Run tests
async function runTests() {
    console.log('🚀 Testing @ba-calderonmorales/clean-api library');
    console.log('Available routes:', apiBase.routes);
    console.log('==================================================');
    
    try {
        // Test GET all posts
        console.log('\n📋 GET all posts:');
        const allPosts = await getAllPosts();
        console.log(`✅ Status: ${allPosts.status}, Posts count: ${allPosts.data.length}`);
        
        // Test GET single post
        console.log('\n📄 GET single post:');
        const singlePost = await getPost(1);
        console.log(`✅ Status: ${singlePost.status}, Title: "${singlePost.data.title}"`);
        
        // Test POST
        console.log('\n✏️ POST new post:');
        const newPost = await createPost({
            title: 'Test Post',
            body: 'Testing clean-api library',
            userId: 1
        });
        console.log(`✅ Status: ${newPost.status}, Created ID: ${newPost.data.id}`);
        
        // Test PUT
        console.log('\n🔄 PUT update post:');
        const updatedPost = await updatePost(1, {
            id: 1,
            title: 'Updated Title',
            body: 'Updated body',
            userId: 1
        });
        console.log(`✅ Status: ${updatedPost.status}, Updated title: "${updatedPost.data.title}"`);
        
        // Test DELETE
        console.log('\n🗑️ DELETE post:');
        const deletedPost = await deletePost(1);
        console.log(`✅ Status: ${deletedPost.status}, Deleted successfully`);
        
        console.log('\n🎉 All tests passed! Clean API library working correctly.');
        
    } catch (error) {
        if (error instanceof APIError) {
            console.error(`❌ API Error - Status: ${error.status}, Message: ${error.message}`);
        } else {
            console.error('❌ Unexpected error:', error.message);
        }
    }
}

// Run the tests
runTests();
