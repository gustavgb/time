import PropTypes from 'prop-types'

export const stateModel = {
  start: 0,
  end: 0,
  project: null
}

export const propModel = PropTypes.shape({
  start: PropTypes.number,
  end: PropTypes.number,
  project: PropTypes.string
})
