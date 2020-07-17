import { Management, runDistantPrisma } from '@prisma-multi-tenant/shared'

import { Command, CommandArguments } from '../types'

class Studio implements Command {
  name = 'studio'
  args = [
    {
      name: 'name',
      optional: false,
      description: 'Name of the tenant you want to access',
    },
  ]
  options = [
    {
      name: 'port',
      description: 'Port to start Studio on',
    },
  ]
  description = 'Use Studio to access a tenant'

  async execute(args: CommandArguments, management: Management) {
    const [name] = args.args
    const port = args.options.port || '5555'

    console.log(`\n  Studio started for tenant "${name}" at http://localhost:${port}\n`)

    const tenant = await management.read(name)

    await runDistantPrisma(`studio --port ${port} ${args.secondary} --experimental`, tenant, false)
  }
}

export default new Studio()