import * as React from 'react'
import { useContext } from 'react'
import { useWindowSize } from 'react-use'
import Github from 'react-feather/dist/icons/github'
import styled, { css } from 'styled-components'
import { Link } from 'docz'

import { Hamburguer } from '../Sidebar/Hamburguer'
import { Container, Logo } from '../../ui'
import { breakpoints } from '../../../styles/responsive'
import { mainContext } from '../Main'

const Wrapper = styled.div`
  z-index: 999;
  width: 100%;
  position: fixed;
  height: 60px;
  background-image: linear-gradient(
    to right,
    #346376 0%,
    #18b772 100%
  );

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    ${p =>
      p.theme.mq({
        padding: ['0 14px', '0 20px', '0 20px', '0 20px'],
      })};
  }
`

const LogoLink = styled(Link)`
  height: 30px;
`

const Menu = styled.div`
  display: flex;
`

const linkStyle = (p: any) => css`
  color: ${p.theme.colors.white};
  opacity: 0.5;
  transition: opacity 0.2s;
  font-size: 15px;
  font-weight: 400;

  &.active,
  &:visited,
  &:hover {
    color: ${p.theme.colors.white};
    opacity: 1;
  }
`

const MenuLink = styled(Link)`
  ${linkStyle};
  margin: 0 10px;
`

export const IconLink = styled.a`
  ${linkStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 20px;

  svg {
    stroke: ${p => p.theme.colors.white};
  }
`

interface MenuListItem {
  id: number
  children: React.ReactNode
  [key: string]: any
}

export const TOPBAR_LINKS: MenuListItem[] = [
  {
    id: 1,
    children: 'Documentation',
    to: '/docs/how-mymoid-works',
  },
  {
    id: 2,
    children: 'Blog',
    to: '/blog/hello-world',
  }
]

export const Topbar = () => {
  const { width } = useWindowSize()
  const showFullMenu = width > breakpoints.tablet
  const { showing, setShowing } = useContext(mainContext)

  return (
    <Wrapper>
      <Container>
        <LogoLink to="/">
          <Logo height={30} small={!showFullMenu} />
        </LogoLink>
        <Menu>
          {showFullMenu &&
            TOPBAR_LINKS.map(({ id, children, ...props }) => {
              const Component = props.to ? MenuLink : IconLink
              return (
                <Component key={id} {...props}>
                  {children}
                </Component>
              )
            })}
          <IconLink
            as="a"
            href="https://github.com/technoactivity"
            target="_blank"
          >
            <Github width={30} />
          </IconLink>
          {!showFullMenu && (
            <Hamburguer
              opened={showing}
              onClick={() => setShowing((s: any) => !s)}
            />
          )}
        </Menu>
      </Container>
    </Wrapper>
  )
}
