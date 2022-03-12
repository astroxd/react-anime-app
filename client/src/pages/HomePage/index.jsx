import { Container, Row, Col } from 'react-bootstrap'
import TrendingNow from './components/TrendingNow'
import Carousel from '../../components/Carousel'
import PopularThisSeason from './components/PopularThisSeason'
import NextSeason from './components/NextSeason'
import AllTimePopular from './components/AllTimePopular'
import { useState, useEffect } from 'react'
import { gqlAxios } from '../../helpers/gql-axios'

const HomePage = () => {
	const [animes, setAnimes] = useState([])

	const query = {
		query: ` 
			query($page: Int, $perPage: Int){
				Page(page: $page, perPage: $perPage){
					media (type: ANIME, sort: TRENDING_DESC){
						id
						title{
							english
							romaji
						}
						bannerImage
						genres
					}
				}
			}
				
		`,
		variables: { page: 1, perPage: 10 },
	}

	const getAnimes = async () => {
		const result = await gqlAxios({ data: query })
		if (result?.data?.data.Page) {
			const resultAnimes = result.data.data.Page.media
			const filteredAnimes = resultAnimes.filter((anime) => anime?.bannerImage)
			console.log(filteredAnimes)
			setAnimes(filteredAnimes)
		}
	}

	useEffect(() => {
		getAnimes()
	}, [])

	return (
		<div>
			<section className='hero' style={{ overflow: 'hidden' }}>
				<Carousel animes={animes} />
			</section>
			<section className='content' style={{ paddingTop: '80px' }}>
				<Container>
					<Row>
						<Col lg={8}>
							<TrendingNow />
							<PopularThisSeason />
						</Col>
						<Col lg={4}>
							<NextSeason />
							<AllTimePopular />
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	)
}

export default HomePage
