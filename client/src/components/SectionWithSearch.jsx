import { Container, Row } from 'react-bootstrap'

const SectionWithSearch = ({
	Component,
	sectionTitle,
	className,
	Anime,
	Search,
	ShowMore,
}) => {
	return (
		<section className={className}>
			<Container style={{ marginTop: '40px', marginBottom: '50px' }}>
				<Row>
					<div className='section-header'>
						<div className='section-title'>
							<h4>{sectionTitle}</h4>
						</div>
						<div className='section-search'>
							<input
								type='search'
								placeholder='Search Anime'
								onChange={(e) => {
									Search(e.target.value)
								}}
							/>
						</div>
					</div>
				</Row>
				<Component Anime={Anime} ShowMore={ShowMore} />
			</Container>
		</section>
	)
}

export default SectionWithSearch
