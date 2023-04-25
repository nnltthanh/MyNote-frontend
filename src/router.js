import {createRouter, createWebHistory} from 'vue-router'
import store from './store/UserStore';

//pages
import NotFound from './components/pages/NotFound.vue';
import UserAuth from './components/pages/LoginUser.vue';
import WelcomeHome from './components/pages/WelcomeHome.vue';
import SignUpUser from './components/pages/SignUp.vue';
import HelpCenter from './components/pages/HelpCenter.vue';
//journal entries
import JournalEntryHome from './components/journal/JournalEntryHome.vue';
import JournalEntryResults from './components/journal/JournalEntryResults.vue';
import CreateJournalEntry from './components/journal/CreateJournalEntry.vue';
import ViewJournalEntry from './components/journal/ViewJournalEntry.vue';
import EditJournalEntry from './components/journal/EditJournalEntry.vue';
import DeleteJournalEntry from './components/journal/DeleteJournalEntry.vue';

const router = createRouter({
    history: createWebHistory(),
    //scroll to the top and left of the screen, smooth scroll
    scrollBehavior() {
        return { top: 0, left: 0, behavior: "smooth"}
    },
    routes: [
        //pages
        {path: '/home', component: WelcomeHome},
        {path: '/', redirect: '/login'},
        {path: '/login', component: UserAuth, meta: {requiresAuth: false}},
        {path: '/signup', component: SignUpUser, meta: {requiresAuth: false}},
        {path: '/help', component: HelpCenter, meta: {requiresAuth: true}},
        //invalid route
        {path: '/:notFound(.*)', component: NotFound},
        //journal entries
        {path: '/notes', component: JournalEntryHome, meta: {requiresAuth: true}},
        {path: '/notes/:userSearchQuery', component: JournalEntryResults, name: 'JournalEntryResults', meta: {requiresAuth: true}},
        {path: '/notes/create', component: CreateJournalEntry, meta: {requiresAuth: true}},
        {path: '/notes/view/:_id', component: ViewJournalEntry, meta: {requiresAuth: true}},
        {path: '/notes/edit/:_id', component: EditJournalEntry, meta: {requiresAuth: true}},
        {path: '/notes/delete/:_id', component: DeleteJournalEntry, meta: {requiresAuth: true}},
    ],
});

//global navigation guard
router.beforeEach(function(to, from, next) {
    //if this page requires authentication and user is not logged in
    if(to.meta.requiresAuth && !store.state.isLoggedIn) {
        //send to login page
        next('/login');
    } else {
        next();
    }
})

export default router;