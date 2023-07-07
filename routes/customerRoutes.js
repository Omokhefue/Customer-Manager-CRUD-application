const { Router } = require('express')
const { getAllCustomers, getEditCustomer, getCustomersPerPagination, getSingleCustomer, postNewCustomer, updateCustomer, deleteCustomer, getNewCustomer, deleteAllCustomers, getSendEmail, postSendEmail } = require('../Controllers/customerControllers')
const router = Router()

router.get('/', getAllCustomers)
router.get('/paginated', getCustomersPerPagination)
router.get('/new-customer', getNewCustomer)
router.post('/new-customer', postNewCustomer)
router.post('/send-email', postSendEmail)
router.get('/edit-customer/:id', getEditCustomer)
router.delete('/delete', deleteAllCustomers)
router.get('/send-email', getSendEmail)
router.get('/:id', getSingleCustomer)
router.patch('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

module.exports = router