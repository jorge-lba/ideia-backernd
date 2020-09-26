
const Firebase = use('Firebase/Admin')

const listAllUsers = async (nextPageToken) => {
  try {
    const listUsersResult = await Firebase.auth().listUsers(1000, nextPageToken)
    return listUsersResult.users.map(user => user.uid)
  } catch (error) {
    console.log(error)
  }
}

const deleteAllUsers = async (listUser = listAllUsers) => {
  try {
    const list = await listUser()
    await Firebase.auth().deleteUsers(list)

    console.log('Usuários removidos com Sucesso')
  } catch (error) {
    console.log(error)
  }
}

module.exports = deleteAllUsers
