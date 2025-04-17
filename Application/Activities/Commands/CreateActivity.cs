using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            //Adds activity to context
            context.Activities.Add(request.Activity);

            //Saves changes to database
            await context.SaveChangesAsync(cancellationToken);

            return request.Activity.Id;
        }
    }
}
