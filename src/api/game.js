import { request } from './request';
import { getAllPlatform, getPlatformBySlug } from './platform';

const PAGE_SIZE = 6;

function mapMedia(url) {
    return { data: url ? { attributes: { url } } : null };
}

function mapGame(game, platforms) {
    const platform = platforms.find((item) => item.id === game.platformId);

    return {
        id: game.id,
        attributes: {
            ...game,
            cover: mapMedia(game.cover),
            wallpaper: mapMedia(game.wallpaper),
            screenshots: {
                data: (game.screenshots || []).map((url) => ({ attributes: { url } })),
            },
            platform: { data: platform || null },
        },
    };
}

async function getMappedGames(games) {
    const { data: platforms } = await getAllPlatform();
    return games.map((game) => mapGame(game, platforms));
}

function sortByReleaseDate(games) {
    return [...games].sort((first, second) =>
        new Date(second.releaseDate || 0) - new Date(first.releaseDate || 0)
    );
}

function paginatedGames(games, page) {
    const currentPage = Math.max(1, Number(page) || 1);
    const start = (currentPage - 1) * PAGE_SIZE;

    return {
        data: games.slice(start, start + PAGE_SIZE),
        meta: {
            pagination: {
                page: currentPage,
                pageCount: Math.max(1, Math.ceil(games.length / PAGE_SIZE)),
                pageSize: PAGE_SIZE,
                total: games.length,
            },
        },
    };
}

export async function getLastPublished() {
    const games = sortByReleaseDate(await request('/games'));
    return { data: await getMappedGames(games.slice(0, 1)) };
}

export async function getLatestPublished(limit = 9, platformId = null) {
    let games = sortByReleaseDate(await request('/games'));
    if (platformId) {
        games = games.filter((game) => game.platformId === Number(platformId));
    }
    return { data: await getMappedGames(games.slice(0, Number(limit))) };
}

export async function getGamesByPlatformSlug(slug, page = 1) {
    const platform = await getPlatformBySlug(slug);
    const games = await request(`/platforms/${platform.id}/games`);
    return paginatedGames(await getMappedGames(sortByReleaseDate(games)), page);
}

export async function searchGames(text, page = 1) {
    const games = await request('/games');
    const matchingGames = sortByReleaseDate(games).filter((game) =>
        game.title.toLocaleLowerCase().includes((text || '').toLocaleLowerCase())
    );
    return paginatedGames(await getMappedGames(matchingGames), page);
}

export async function getBySlug(slug) {
    const [game, { data: platforms }] = await Promise.all([
        request(`/games/slug/${encodeURIComponent(slug)}`),
        getAllPlatform(),
    ]);
    return mapGame(game, platforms);
}

export async function getGameById(id) {
    const [game, { data: platforms }] = await Promise.all([
        request(`/games/${encodeURIComponent(id)}`),
        getAllPlatform(),
    ]);
    return mapGame(game, platforms);
}

export async function getGamesByIds(ids) {
    if (ids.length === 0) return [];
    const [{ data: platforms }, games] = await Promise.all([
        getAllPlatform(),
        request('/games'),
    ]);
    const gamesById = new Map(games.map((game) => [game.id, game]));
    return ids.map((id) => gamesById.get(Number(id)))
        .filter(Boolean)
        .map((game) => mapGame(game, platforms));
}
