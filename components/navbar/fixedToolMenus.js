import { faBeer, faPause, faBan, faRandom, faCloudUploadAlt, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faFrown, faQuestionCircle, faThumbsDown, faThumbsUp, faCopyright, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import i18next from 'i18next'

const t = i18next.t.bind(i18next)

const toolMenus = () => [
    { href: '/NeededPages', icon: faBeer, text: t('titles.needed_pages') },
    { href: '/OrphanedPages', icon: faFrown, text: t('titles.orphaned_pages') },
    { href: '/OrphanedCategories', icon: faFrown, text: t('titles.orphaned_categories') },
    { href: '/UncategorizedPages', icon: faQuestionCircle, text: t('titles.uncategorized_pages') },
    { href: '/OldPages', icon: faPause, text: t('titles.old_pages') },
    { href: '/ShortestPages', icon: faThumbsDown, text: t('titles.short_title_pages') },
    { href: '/LongestPages', icon: faThumbsUp, text: t('titles.long_title_pages') },
    { href: '/BlockHistory', icon: faBan, text: t('titles.block_history') },
    { href: '/RandomPage', icon: faRandom, text: t('titles.random_page') },
    { href: '/Upload', icon: faCloudUploadAlt, text: t('titles.upload') },
    { href: '/License', icon: faCopyright, text: t('titles.license') },
	{ href: '/Terms', icon: faStickyNote, text: t('skin_buma:terms') }
]

export default toolMenus;
