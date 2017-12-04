import $ from 'jquery'

export function servicePost (serviceName, data, type='POST') {
  let post = {
    type: type,
    // url: 'http://pasitoapaso.themonstera.com/services/' + serviceName + '.php',
    url: 'http://pap.servicios.local/' + serviceName + '.php',
    dataType: 'json',
    crossDomain: true
  }

  if (type === 'POST') {
    post.data = data
  }

  return $.ajax(post)
}
